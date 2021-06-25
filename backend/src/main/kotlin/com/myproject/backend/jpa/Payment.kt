package com.myproject.backend.jpa

import java.sql.Date
import java.time.LocalDate
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "payment")
data class Payment(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long? = null,

    @Column(name = "employee_id")
    val employeeId: Long,

    @Column(name = "amount")
    val amount: Float = 0f,

    @Column(name = "type")
    val type: String? = null,

    @Column(name = "issuer_id")
    val issuerId: Long,

    @Column(name = "pay_date", columnDefinition = "DATE")
    val payDate: LocalDate

)