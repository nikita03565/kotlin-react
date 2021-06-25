package com.myproject.backend.service

import com.myproject.backend.jpa.Account
import com.myproject.backend.models.UpdateAccount
import com.myproject.backend.repositories.AccountRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
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
            accountToUpdate.amount = account.amount!!
        }
        return accountToUpdate;
    }

    @Transactional
    fun addAmount(account: Account, paymentAmount: Float): Account {
        account.received_amount += paymentAmount
        return account
    }

    @Transactional
    fun deleteAccount(id: Long) {
        accountRepository.deleteById(id)
    }

    @Transactional
    fun createAccount(body: UpdateAccount, employeeId: Long?): Account {
        val account = accountRepository.save(
            Account(
                accountNumber = body.accountNumber!!,
                routingNumber = body.routingNumber!!,
                nickname = body.nickname!!,
                employeeId = employeeId!!,
                priority = body.priority!!,
                allocationType = body.allocationType!!,
                amount = body.amount!!,
            )
        )
        return account
    }
}