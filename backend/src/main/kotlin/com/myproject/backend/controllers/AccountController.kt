package com.myproject.backend.controllers

import com.myproject.backend.jpa.Account
import com.myproject.backend.jpa.Company
import com.myproject.backend.jpa.Employee
import com.myproject.backend.jpa.Role
import com.myproject.backend.models.CreateCompany
import com.myproject.backend.models.UpdateAccount
import com.myproject.backend.models.UpdateUser
import com.myproject.backend.repositories.AccountRepository
import com.myproject.backend.repositories.EmployeeRepository
import com.myproject.backend.repositories.RoleRepository
import com.myproject.backend.repositories.CompanyRepository
import com.myproject.backend.service.AccountService
import com.myproject.backend.service.CompanyService
import com.myproject.backend.service.EmployeeService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.servlet.http.HttpServletRequest
import javax.validation.Valid


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = ["*"], maxAge = 3600)
class AccountController() {

    @Autowired
    lateinit var employeeRepository: EmployeeRepository

    @Autowired
    lateinit var accountRepository: AccountRepository

    @Autowired
    lateinit var accountService: AccountService

    @GetMapping("/users/me/accounts")
    @PreAuthorize("hasRole('USER')")
    @ResponseBody
    fun getCurrentUserAccounts(authentication: Authentication): Any {
        val user: Employee = employeeRepository.findByUsername(authentication.name).get()
        val accounts = accountRepository.findAccountByEmployeeId(user.id)
        return accounts
    }

    @PostMapping("/accounts")
    @PreAuthorize("hasRole('USER')")
    @ResponseBody
    fun createAccount(authentication: Authentication, @Valid @RequestBody body: UpdateAccount): Account? {
        val employeeId: Long? = employeeRepository.findByUsername(authentication.name).get().id
        val account = accountService.createAccount(body, employeeId)
        updatePriorities(employeeId!!)
        return account
    }

    @PatchMapping("/accounts/{id}")
    @PreAuthorize("hasRole('USER')")
    @ResponseBody
    fun updateAccount(@PathVariable id: String, authentication: Authentication, @Valid @RequestBody body: UpdateAccount): Account? {
        val user: Employee = employeeRepository.findByUsername(authentication.name).get()
        val account = accountService.updateAccount(body, id.toLong())
        updatePriorities(user.id!!)
        return account
    }

    @DeleteMapping("/accounts/{id}")
    @PreAuthorize("hasRole('USER')")
    @ResponseBody
    fun deleteAccount(@PathVariable id: String, authentication: Authentication) {
        val user: Employee = employeeRepository.findByUsername(authentication.name).get()
        accountService.deleteAccount(id.toLong())
        updatePriorities(user.id!!)
    }

    fun updatePriorities(employeeId: Long) {
        val accounts = accountRepository.findAccountByEmployeeId(employeeId).sortedWith(compareBy({ it.allocationType == "remainder" }, { it.priority }))

        accounts.forEachIndexed {idx, acc ->
            val body = UpdateAccount(priority = idx + 1)
            val updated = accountService.updateAccount(body, acc.id!!)
        }
    }

}