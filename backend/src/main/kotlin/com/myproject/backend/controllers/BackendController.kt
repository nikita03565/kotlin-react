package com.myproject.backend.controllers

//import com.myproject.backend.repository.PersonRepository
import com.myproject.backend.jpa.Account
import com.myproject.backend.jpa.Company
import com.myproject.backend.jpa.Employee
import com.myproject.backend.models.UpdateAccount
import com.myproject.backend.repositories.AccountRepository
import com.myproject.backend.repositories.EmployeeRepository
import com.myproject.backend.service.AccountService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest
import javax.validation.Valid


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = ["*"], maxAge = 3600)
class BackendController() {

    @Autowired
    lateinit var employeeRepository: EmployeeRepository

    @Autowired
    lateinit var accountRepository: AccountRepository

    @Autowired
    lateinit var accountService: AccountService

    @GetMapping("/users/me")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @ResponseBody
    fun getCurrentUserContent(authentication: Authentication): Any {
        val user: Employee = employeeRepository.findByUsername(authentication.name).get()
        return user
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('SUPER') or hasRole('ADMIN')")
    @ResponseBody
    fun getUsers(request: HttpServletRequest, authentication: Authentication): Any {
        val usersCompany: Company = employeeRepository.findByUsername(authentication.name).get().company!!
        return if (request.isUserInRole("ROLE_SUPER")) {
            employeeRepository.findAll()
        }else if (request.isUserInRole("ROLE_ADMIN")) {
            employeeRepository.findAllByCompany(usersCompany)
        } else {
            emptyList<Employee>()
        }
    }

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
        // TODO validate
        val employeeId: Long? = employeeRepository.findByUsername(authentication.name).get().id
        val account = accountService.createAccount(body, employeeId)
        return account
    }

    @PatchMapping("/accounts/{id}")
    @PreAuthorize("hasRole('USER')")
    @ResponseBody
    fun updateAccount(@PathVariable id: String, authentication: Authentication, @Valid @RequestBody body: UpdateAccount): Account? {
        // TODO validate
        val user: Employee = employeeRepository.findByUsername(authentication.name).get()
        val account = accountService.updateAccount(body, id.toLong())
        return account
    }

    @DeleteMapping("/accounts/{id}")
    @PreAuthorize("hasRole('USER')")
    @ResponseBody
    fun deleteAccount(@PathVariable id: String, authentication: Authentication) {
        // TODO validate
        val user: Employee = employeeRepository.findByUsername(authentication.name).get()
        accountService.deleteAccount(id.toLong())
    }

    @GetMapping("/admincontent")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseBody
    fun getAdminContent(): String {
        return "Admin's content"
    }
}