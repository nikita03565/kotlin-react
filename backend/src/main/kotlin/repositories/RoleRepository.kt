package repositories

import jpa.Role
import org.springframework.data.repository.query.Param
import org.springframework.data.jpa.repository.JpaRepository

interface RoleRepository : JpaRepository<Role, Long> {

    fun findByName(@Param("name") name: String): Role
}
