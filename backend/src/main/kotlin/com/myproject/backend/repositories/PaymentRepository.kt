package com.myproject.backend.repositories

import com.myproject.backend.jpa.Account
import com.myproject.backend.jpa.Payment
import com.myproject.backend.jpa.Role
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.query.Param

interface PaymentRepository : JpaRepository<Payment, Long> {
    fun findAccountByEmployeeId(@Param("employee_id") employeeId: Long?): Collection<Payment>
    fun findAccountByIssuerId(@Param("issuer_id") issuerId: Long?): Collection<Payment>
}