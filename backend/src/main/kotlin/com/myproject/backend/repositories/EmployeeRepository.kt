package com.myproject.backend.repositories

import com.myproject.backend.jpa.Company
import com.myproject.backend.jpa.Employee
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.query.Param
import java.util.*
import javax.transaction.Transactional

interface EmployeeRepository: JpaRepository<Employee, Long> {

    fun existsByUsername(@Param("username") username: String): Boolean

    fun findByUsername(@Param("username") username: String): Optional<Employee>

    @Transactional
    fun deleteByUsername(@Param("username") username: String)

    fun findAllByCompany(@Param("company") company: Company): Collection<Employee>

}