package com.myproject.backend.models
import com.fasterxml.jackson.annotation.JsonProperty
import java.io.Serializable


class UpdateUser: Serializable {
    @JsonProperty("firstName")
    var firstName: String? = null

    @JsonProperty("lastName")
    var lastName: String? = null

    @JsonProperty("title")
    var title: String? = null

    @JsonProperty("salary")
    var salary: Int? = null

    @JsonProperty("companyId")
    var companyId: Long? = null

    constructor() {}

    constructor(firstName: String, lastName: String, title: String, salary: Int, companyId: Long) {
        this.firstName = firstName
        this.lastName = lastName
        this.title = title
        this.salary = salary
        this.companyId = companyId
    }

    companion object {
        private const val serialVersionUID = -1764970284520387975L
    }
}