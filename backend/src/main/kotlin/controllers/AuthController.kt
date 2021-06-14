package controllers

import javax.validation.Valid
import java.util.*
import java.util.stream.Collectors

import org.springframework.security.core.Authentication
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

import models.LoginUser
import models.CreateUser
import response.ResponseMessage
import jpa.User
import repositories.UserRepository
import repositories.RoleRepository


@CrossOrigin(origins = ["*"], maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
class AuthController() {

    @Autowired
    lateinit var authenticationManager: AuthenticationManager

    @Autowired
    lateinit var userRepository: UserRepository

    @Autowired
    lateinit var roleRepository: RoleRepository

    @Autowired
    lateinit var encoder: PasswordEncoder

    @PostMapping("/signin")
    fun authenticateUser(@Valid @RequestBody loginRequest: LoginUser): ResponseEntity<*> {

        val userCandidate: Optional <User> = userRepository.findByUsername(loginRequest.username!!)

        if (userCandidate.isPresent) {
            val user: User = userCandidate.get()
            val authentication = authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(loginRequest.username, loginRequest.password))
            SecurityContextHolder.getContext().setAuthentication(authentication)
            val authorities: List<GrantedAuthority> = user.roles!!.stream().map({ role -> SimpleGrantedAuthority(role.name)}).collect(Collectors.toList<GrantedAuthority>())
            return ResponseEntity.ok("ok")
        } else {
            return ResponseEntity("User not found!", HttpStatus.BAD_REQUEST)
        }
    }

    @PostMapping("/signup")
    fun registerUser(@Valid @RequestBody createUser: CreateUser): ResponseEntity<*> {

        val userCandidate: Optional <User> = userRepository.findByUsername(createUser.username!!)

        if (!userCandidate.isPresent) {
            if (usernameExists(createUser.username!!)) {
                return ResponseEntity(ResponseMessage("Username is already taken!"),
                    HttpStatus.BAD_REQUEST)
            }

            // Creating user's account
            val user = User(
                0,
                createUser.username!!,
                createUser.firstName!!,
                createUser.lastName!!,
                encoder.encode(createUser.password),
                true
            )
            user!!.roles = Arrays.asList(roleRepository.findByName("ROLE_USER"))

            userRepository.save(user)

            return ResponseEntity(ResponseMessage("User registered successfully!"), HttpStatus.OK)
        } else {
            return ResponseEntity(ResponseMessage("User already exists!"),
                HttpStatus.BAD_REQUEST)
        }
    }

    private fun usernameExists(username: String): Boolean {
        return userRepository.findByUsername(username).isPresent
    }

}