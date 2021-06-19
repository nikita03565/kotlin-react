package com.myproject.backend.controllers

import org.springframework.web.bind.annotation.*
import java.util.concurrent.atomic.AtomicLong
//import com.myproject.backend.repository.PersonRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.Authentication
import com.myproject.backend.repositories.EmployeeRepository
import com.myproject.backend.repositories.AccountRepository
import com.myproject.backend.jpa.Employee
import com.myproject.backend.jpa.Account

//import com.myproject.backend.email.EmailServiceImpl
import com.myproject.backend.response.ResponseMessage
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseEntity
import org.springframework.http.HttpStatus
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.KotlinModule


val mapper = ObjectMapper().registerModule(KotlinModule())


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = ["*"], maxAge = 3600)
class BackendController() {

    @Autowired
    lateinit var employeeRepository: EmployeeRepository

    @Autowired
    lateinit var accountRepository: AccountRepository

    @GetMapping("/users/me")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @ResponseBody
    fun getUserContent(authentication: Authentication): Any {
        val user: Employee = employeeRepository.findByUsername(authentication.name).get()
        return user //ResponseEntity(user, HttpStatus.OK)
    }

    @GetMapping("/admincontent")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseBody
    fun getAdminContent(): String {
        return "Admin's content"
    }
}