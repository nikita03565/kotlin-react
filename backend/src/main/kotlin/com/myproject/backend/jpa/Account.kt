package com.myproject.backend.jpa

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
@Table(name = "account")
data class Account (
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long,

    @Column(name = "nickname")
    val nickname: String,

    @Column(name = "routing_number")
    val routingNumber: String,

    @Column(name = "account_number")
    val accountNumber: String,

    @Column(name = "amount")
    val amount: Float,

    @Column(name = "allocation_type")
    val allocationType: String,

    @Column(name = "is_remainder")
    val isRemainder: Boolean,

    @Column(name = "priority")
    val priority: Int,

    @Column(name = "employee_id")
    val employeeId: Int,

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="employee_id", nullable=false, insertable = false, updatable = false)
    val employee: Employee
)