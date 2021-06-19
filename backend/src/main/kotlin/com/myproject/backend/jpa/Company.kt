package com.myproject.backend.jpa

import javax.persistence.*

@Entity
@Table(name = "company")
data class Company(

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long,

    @Column(name = "name")
    val name: String

)