package com.myproject.backend.service

import com.myproject.backend.jpa.Account
import com.myproject.backend.jpa.Company
import com.myproject.backend.jpa.Employee
import com.myproject.backend.jpa.Role
import com.myproject.backend.models.CreateCompany
import com.myproject.backend.models.UpdateAccount
import com.myproject.backend.repositories.CompanyRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
class CompanyService {
    @Autowired
    lateinit var companyRepository: CompanyRepository

    @Transactional
    fun createCompany(body: CreateCompany): Company {
        val company = companyRepository.save(
            Company(
                name = body.name!!
            )
        )
        return company
    }
}