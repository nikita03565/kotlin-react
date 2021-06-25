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
class EmployeeController() {

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

    @GetMapping("/users/me")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SUPER')")
    @ResponseBody
    fun getCurrentUserContent(authentication: Authentication): Any {
        val user: Employee = employeeRepository.findByUsername(authentication.name).get()
        return user
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('SUPER') or hasRole('ADMIN')")
    @ResponseBody
    fun getUsers(request: HttpServletRequest, authentication: Authentication): Any {
        return if (request.isUserInRole("ROLE_SUPER")) {
            employeeRepository.findAll()
        }else if (request.isUserInRole("ROLE_ADMIN")) {
            val usersCompany: Company = employeeRepository.findByUsername(authentication.name).get().company!!
            employeeRepository.findAllByCompany(usersCompany)
        } else {
            emptyList<Employee>()
        }
    }

    @PatchMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER')")
    @ResponseBody
    fun updateEmployee(@PathVariable id: String, authentication: Authentication, @Valid @RequestBody body: UpdateUser): Employee? {
        // TODO validate
        val user: Employee = employeeRepository.findByUsername(authentication.name).get()
        val employee = employeeService.updateEmployee(body, id.toLong())
        return employee
    }

    @PostMapping("/users/{id}/make_admin")
    @PreAuthorize("hasRole('SUPER')")
    @ResponseBody
    fun makeAdmin(authentication: Authentication, @PathVariable id: String): Any {
        // TODO validate permissions!
        val employee: Employee = employeeRepository.findById(id.toLong()).get()
        val role: Role = roleRepository.findByName("ROLE_ADMIN")
        employeeService.addRole(employee, role)
        return role
    }

    @PostMapping("/users/{id}/make_super")
    @PreAuthorize("hasRole('SUPER')")
    @ResponseBody
    fun makeSuper(authentication: Authentication, @PathVariable id: String): Any {
        // TODO validate permissions!
        val employee: Employee = employeeRepository.findById(id.toLong()).get()
        val role: Role = roleRepository.findByName("ROLE_SUPER")
        employeeService.addRole(employee, role)
        return role
    }

    @PostMapping("/users/{id}/remove_super")
    @PreAuthorize("hasRole('SUPER')")
    @ResponseBody
    fun removeSuper(authentication: Authentication, @PathVariable id: String): Any {
        // TODO validate permissions!
        val employee: Employee = employeeRepository.findById(id.toLong()).get()
        val role: Role = roleRepository.findByName("ROLE_SUPER")
        employeeService.removeRole(employee, role)
        return role
    }

    @PostMapping("/users/{id}/remove_admin")
    @PreAuthorize("hasRole('SUPER')")
    @ResponseBody
    fun removeAdmin(authentication: Authentication, @PathVariable id: String): Any {
        // TODO validate permissions!
        val employee: Employee = employeeRepository.findById(id.toLong()).get()
        val role: Role = roleRepository.findByName("ROLE_ADMIN")
        employeeService.removeRole(employee, role)
        return role
    }

    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasRole('SUPER')")
    @ResponseBody
    fun removeUser(authentication: Authentication, @PathVariable id: String): Any {
        // TODO validate permissions!
        val employee: Employee = employeeRepository.findById(id.toLong()).get()
        val role: Role = roleRepository.findByName("ROLE_USER")
        employeeService.removeRole(employee, role)
        return role
    }
}