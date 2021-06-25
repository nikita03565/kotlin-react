package com.myproject.backend.controllers

import com.myproject.backend.jpa.Account
import com.myproject.backend.jpa.Company
import com.myproject.backend.jpa.Employee
import com.myproject.backend.jpa.Payment
import com.myproject.backend.models.CreateCompany
import com.myproject.backend.models.PaymentBody
import com.myproject.backend.repositories.AccountRepository
import com.myproject.backend.repositories.EmployeeRepository
import com.myproject.backend.repositories.PaymentRepository
import com.myproject.backend.service.AccountService
import com.myproject.backend.service.EmployeeService
import com.myproject.backend.service.PaymentService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest
import javax.validation.Valid


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = ["*"], maxAge = 3600)
class PaymentController {

    @Autowired
    lateinit var employeeRepository: EmployeeRepository

    @Autowired
    lateinit var employeeService: EmployeeService

    @Autowired
    lateinit var paymentRepository: PaymentRepository

    @Autowired
    lateinit var accountRepository: AccountRepository

    @Autowired
    lateinit var accountService: AccountService

    @Autowired
    lateinit var paymentService: PaymentService

    @PostMapping("/payments/pay_all")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseBody
    fun payAll(request: HttpServletRequest, authentication: Authentication): Any {
        val issuer = employeeRepository.findByUsername(authentication.name).get()
        val usersCompany: Company = employeeRepository.findByUsername(authentication.name).get().company!!
        val users = employeeRepository.findAllByCompany(usersCompany)
        val payments = arrayListOf<Payment>()
        for (user in users) {
            val payment = payEmployee(user, user.salary!!.toFloat(), "Reg", issuer)
            payments.add(payment)
        }
        return payments
    }

    @PostMapping("/users/{id}/pay")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseBody
    fun payUser(request: HttpServletRequest, authentication: Authentication, @PathVariable id: String, @Valid @RequestBody body: PaymentBody): Any {
        val user = employeeRepository.findByUsername(authentication.name).get()
        val usersCompany: Company = user.company!!
        val employee: Employee = employeeRepository.findById(id.toLong()).get()
//        val accounts = accountRepository.findAccountByEmployeeId(employee.id).sortedBy { it.priority }
//        println(accounts)
//        var amounts = calculateDistribution(accounts, body.amount)
//        accounts.zip(amounts) { acc, am -> accountService.addAmount(acc, am) }
//        val payment = paymentService.createPayment(
//            amount = body.amount,
//            type = body.type!!,
//            issuerId = user.id,
//            employeeId = employee.id,
//        )
        return payEmployee(employee, body.amount, body.type!!, user)
    }

    fun payEmployee(employee: Employee, amount: Float, type: String, issuer: Employee): Payment {
        val accounts = accountRepository.findAccountByEmployeeId(employee.id).sortedBy { it.priority }
        println(accounts)
        var amounts = calculateDistribution(accounts, amount)
        accounts.zip(amounts) { acc, am -> accountService.addAmount(acc, am) }
        val payment = paymentService.createPayment(
            amount = amount,
            type = type,
            issuerId = issuer.id,
            employeeId = employee.id,
        )
        return payment
    }

    fun calculateDistribution(accounts: Collection<Account>, amount: Float): Collection<Float> {
        var remainingAmount = amount

        val res = arrayListOf<Float>()
        for (acc in accounts) {
            if (acc.allocationType == "amount") {
                val toAdd = if (acc.amount!! <= remainingAmount) acc.amount!! else remainingAmount
                res.add(toAdd)
                remainingAmount -= toAdd
            } else if (acc.allocationType == "percentage") {
                val toAdd = if (acc.amount!! * amount<= remainingAmount) acc.amount!! * amount else remainingAmount
                res.add(toAdd)
                remainingAmount -= toAdd
            } else if (acc.allocationType == "remainder") {
                res.add(remainingAmount)
                remainingAmount = 0f
            } else {
                throw Error()
            }
        }
        return res
    }

    @GetMapping("/users/{id}/payments")
    @PreAuthorize("hasRole('USER')")
    @ResponseBody
    fun getUserPayments(request: HttpServletRequest, authentication: Authentication, @PathVariable id: String): Any {
        val employee: Employee = employeeRepository.findByUsername(authentication.name).get()
        val payments = paymentRepository.findAccountByEmployeeId(employee.id)
        return payments
    }
}