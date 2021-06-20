package com.myproject.backend.models
import com.fasterxml.jackson.annotation.JsonProperty
import java.io.Serializable


class UpdateAccount: Serializable {
    @JsonProperty("accountNumber")
    var accountNumber: String? = null

    @JsonProperty("routingNumber")
    var routingNumber: String? = null

    @JsonProperty("nickname")
    var nickname: String? = null

    @JsonProperty("priority")
    var priority: Int? = null

    @JsonProperty("allocationType")
    var allocationType: String? = null

    constructor() {}

    constructor(accountNumber: String, routingNumber: String, nickname: String, priority: Int, allocationType: String) {
        this.accountNumber = accountNumber
        this.routingNumber = routingNumber
        this.nickname = nickname
        this.priority = priority
        this.allocationType = allocationType
    }

    companion object {
        private const val serialVersionUID = -1764970284520387975L
    }
}