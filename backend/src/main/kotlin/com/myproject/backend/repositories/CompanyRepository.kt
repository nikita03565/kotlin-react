package com.myproject.backend.repositories

import com.myproject.backend.jpa.Company
import org.springframework.data.jpa.repository.JpaRepository

interface CompanyRepository : JpaRepository<Company, Long> {
}