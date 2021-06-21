package com.myproject.backend.service

import com.myproject.backend.jpa.Account
import com.myproject.backend.jpa.Employee
import com.myproject.backend.jpa.Role
import com.myproject.backend.models.UpdateAccount
import com.myproject.backend.repositories.AccountRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
class EmployeeService {
    @Transactional
    fun addRole(@Param("employee") employee: Employee, @Param("role") role: Role): Any {
        employee.roles?.add(role)
        return employee
    }

    @Transactional
    fun removeRole(@Param("employee") employee: Employee, @Param("role") role: Role): Any {
        employee.roles?.remove(role)
        return employee
    }
}