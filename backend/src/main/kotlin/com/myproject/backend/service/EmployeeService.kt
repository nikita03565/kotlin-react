package com.myproject.backend.service

import com.myproject.backend.jpa.Account
import com.myproject.backend.jpa.Employee
import com.myproject.backend.jpa.Role
import com.myproject.backend.models.UpdateAccount
import com.myproject.backend.models.UpdateUser
import com.myproject.backend.repositories.AccountRepository
import com.myproject.backend.repositories.EmployeeRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
class EmployeeService {
    @Autowired
    lateinit var employeeRepository: EmployeeRepository
    
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

    @Transactional
    fun updateEmployee(account: UpdateUser, id: Long): Employee? {
        val  employeeToUpdate = employeeRepository.findByIdOrNull(id)
        if ( employeeToUpdate != null) {
             employeeToUpdate.firstName = account.firstName!!
             employeeToUpdate.lastName = account.lastName!!
             employeeToUpdate.title = account.title!!
             employeeToUpdate.salary = account.salary!!
             employeeToUpdate.companyId = account.companyId!!
        }
        return  employeeToUpdate;
    }
}