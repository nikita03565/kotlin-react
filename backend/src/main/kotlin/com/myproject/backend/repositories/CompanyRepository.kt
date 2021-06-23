package com.myproject.backend.repositories

import com.myproject.backend.jpa.Company
import com.myproject.backend.jpa.Employee
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.query.Param
import java.util.*

interface CompanyRepository : JpaRepository<Company, Long> {
    fun findByName(@Param("name") name: String): Optional<Company>
}