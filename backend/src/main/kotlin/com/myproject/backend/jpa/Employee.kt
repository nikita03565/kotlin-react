package com.myproject.backend.jpa

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
@Table(name = "employee")
data class Employee(

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long? = 0,

    @Column(name = "username")
    var username: String? = null,

    @Column(name = "first_name")
    var firstName: String? = null,

    @Column(name = "last_name")
    var lastName: String? = null,

    @JsonIgnore
    @Column(name = "password")
    var password: String? = null,

    @Column(name = "salary")
    var salary: Int? = null,

    @Column(name = "title")
    var title: String? = null,

    @JsonIgnore
    @Column(name = "enabled")
    var enabled: Boolean = false,

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "employees_roles",
        joinColumns = [JoinColumn(name = "employee_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "role_id", referencedColumnName = "id")]
    )
    var roles: MutableCollection<Role>? = null,

    @ManyToOne
    @JoinColumn(name="company_id")
    var company: Company? = null,

//    @OneToMany(mappedBy = "employee") Moved to separate endpoint
//    var accounts: Collection<Account>? = null
)