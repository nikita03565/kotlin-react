package com.myproject.backend.service

import com.myproject.backend.jpa.Account
import com.myproject.backend.models.UpdateAccount
import com.myproject.backend.repositories.AccountRepository
import com.myproject.backend.repositories.EmployeeRepository

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import java.util.*
import java.util.stream.Collectors
import javax.transaction.Transactional

@Service
class AccountService {
    @Autowired
    lateinit var accountRepository: AccountRepository

    @Transactional
    fun updateAccount(account: UpdateAccount, id: Long): Account? {
        val accountToUpdate = accountRepository.findByIdOrNull(id)
        if (accountToUpdate != null) {
            accountToUpdate.routingNumber = account.routingNumber!!
            accountToUpdate.accountNumber = account.accountNumber!!
            accountToUpdate.nickname = account.nickname!!
            accountToUpdate.priority = account.priority!!
            accountToUpdate.allocationType = account.allocationType!!
        }
        return accountToUpdate;
    }
}