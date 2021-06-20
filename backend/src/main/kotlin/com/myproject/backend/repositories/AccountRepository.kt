package com.myproject.backend.repositories

import com.myproject.backend.jpa.Account
import com.myproject.backend.jpa.Employee
import org.springframework.data.repository.query.Param
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.CrudRepository
import java.util.*

interface AccountRepository : CrudRepository<Account, Long> {
    fun findAccountByEmployeeId(@Param("employee_id") employeeId: Long?): Collection<Account>
}
