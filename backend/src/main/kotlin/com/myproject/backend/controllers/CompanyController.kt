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
class CompanyController() {

    @Autowired
    lateinit var employeeRepository: EmployeeRepository

    @Autowired
    lateinit var accountRepository: AccountRepository

    @Autowired
    lateinit var companyRepository: CompanyRepository

    @Autowired
    lateinit var roleRepository: RoleRepository

    @Autowired
    lateinit var accountService: AccountService

    @Autowired
    lateinit var employeeService: EmployeeService

    @Autowired
    lateinit var companyService: CompanyService

    @GetMapping("/companies")
    @ResponseBody
    fun getCompanies(@RequestParam name: String?):  Any {
        // TODO validate
        if (name != null ) {
            val company: Optional<Company> = companyRepository.findByName(name)
            return company
        }
        val companies: Collection<Company> = companyRepository.findAll()
        return companies
    }

    @PostMapping("/companies")
    @PreAuthorize("hasRole('SUPER')")
    @ResponseBody
    fun createCompany(authentication: Authentication, @Valid @RequestBody body: CreateCompany): Company {
        // TODO validate
        val company = companyService.createCompany(body)
        return company
    }
}