package com.myproject.backend.controllers

import javax.validation.Valid
import java.util.*
import java.util.stream.Collectors

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

import com.myproject.backend.models.LoginUser
import com.myproject.backend.models.CreateUser
import com.myproject.backend.response.JwtResponse
import com.myproject.backend.response.ResponseMessage
import com.myproject.backend.jpa.Employee
import com.myproject.backend.repositories.EmployeeRepository
import com.myproject.backend.repositories.RoleRepository
import com.myproject.backend.jwt.JwtProvider


@CrossOrigin(origins = ["*"], maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
class AuthController() {

    @Autowired
    lateinit var authenticationManager: AuthenticationManager

    @Autowired
    lateinit var employeeRepository: EmployeeRepository

    @Autowired
    lateinit var roleRepository: RoleRepository

    @Autowired
    lateinit var encoder: PasswordEncoder

    @Autowired
    lateinit var jwtProvider: JwtProvider

    @PostMapping("/signin")
    fun authenticateUser(@Valid @RequestBody loginRequest: LoginUser): ResponseEntity<*> {

        val userCandidate: Optional <Employee> = employeeRepository.findByUsername(loginRequest.username!!)

        if (userCandidate.isPresent) {
            val user: Employee = userCandidate.get()
            val authentication = authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(loginRequest.username, loginRequest.password))
            SecurityContextHolder.getContext().setAuthentication(authentication)
            val jwt: String = jwtProvider.generateJwtToken(user.username!!)
            val authorities: List<GrantedAuthority> = user.roles!!.stream().map({ role -> SimpleGrantedAuthority(role.name)}).collect(Collectors.toList<GrantedAuthority>())
            return ResponseEntity.ok(JwtResponse(jwt, user.username, authorities))
        } else {
            return ResponseEntity(ResponseMessage("User not found!"),
                HttpStatus.BAD_REQUEST)
        }
    }

    @PostMapping("/signup")
    fun registerUser(@Valid @RequestBody newUser: CreateUser): ResponseEntity<*> {

        val userCandidate: Optional <Employee> = employeeRepository.findByUsername(newUser.username!!)

        if (!userCandidate.isPresent) {
            if (usernameExists(newUser.username!!)) {
                return ResponseEntity(ResponseMessage("Username is already taken!"),
                    HttpStatus.BAD_REQUEST)
            }

            // Creating user's account
            val user = Employee(
                0,
                newUser.username!!,
                newUser.firstName!!,
                newUser.lastName!!,
                encoder.encode(newUser.password),
                0,
                companyId=newUser.companyId,
            )
            user!!.roles = Arrays.asList(roleRepository.findByName("ROLE_USER"))

            employeeRepository.save(user)

            return ResponseEntity(ResponseMessage("User registered successfully!"), HttpStatus.OK)
        } else {
            return ResponseEntity(ResponseMessage("User already exists!"),
                HttpStatus.BAD_REQUEST)
        }
    }

    private fun usernameExists(username: String): Boolean {
        return employeeRepository.findByUsername(username).isPresent
    }

}