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
    var nickname: String,

    @Column(name = "routing_number")
    var routingNumber: String,

    @Column(name = "account_number")
    var accountNumber: String,

    @Column(name = "amount")
    var amount: Float,

    @Column(name = "allocation_type")
    var allocationType: String,

    @Column(name = "is_remainder")
    var isRemainder: Boolean,

    @Column(name = "priority")
    var priority: Int,

    @Column(name = "employee_id")
    val employeeId: Long,

//    @JsonIgnore  Moved to separate endpoint
//    @ManyToOne
//    @JoinColumn(name="employee_id", nullable=false, insertable = false, updatable = false)
//    val employee: Employee
)