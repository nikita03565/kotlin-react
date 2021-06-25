package com.myproject.backend.service

import com.myproject.backend.jpa.Account
import com.myproject.backend.jpa.Payment
import com.myproject.backend.repositories.PaymentRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import javax.transaction.Transactional
import java.time.LocalDate
@Service
class PaymentService {
    @Autowired
    lateinit var paymentRepository: PaymentRepository

    @Transactional
    fun createPayment(amount: Float, type: String, employeeId: Long?, issuerId: Long?): Payment {
        val date = LocalDate.now()
        val payment = paymentRepository.save(
            Payment(
                amount = amount,
                type = type,
                issuerId = issuerId!!,
                employeeId = employeeId!!,
                payDate = date,
            )
        )
        return payment
    }
}