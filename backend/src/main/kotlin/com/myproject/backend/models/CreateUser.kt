package com.myproject.backend.models

import com.fasterxml.jackson.annotation.JsonProperty
import java.io.Serializable

class CreateUser : Serializable {

    @JsonProperty("username")
    var username: String? = null

    @JsonProperty("firstName")
    var firstName: String? = null

    @JsonProperty("lastName")
    var lastName: String? = null

    @JsonProperty("companyId")
    var companyId: Long? = null

    @JsonProperty("password")
    var password: String? = null

    constructor() {}

    constructor(username: String, firstName: String, lastName: String, password: String, companyId: Long?) {
        this.username = username
        this.firstName = firstName
        this.lastName = lastName
        this.password = password
        this.companyId = companyId
    }

    companion object {

        private const val serialVersionUID = -1764970284520387975L
    }
}