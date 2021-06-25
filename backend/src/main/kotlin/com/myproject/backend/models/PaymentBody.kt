
package com.myproject.backend.models
import com.fasterxml.jackson.annotation.JsonProperty
import java.io.Serializable
class PaymentBody: Serializable {

    @JsonProperty("amount")
    var amount: Float = 0f

    @JsonProperty("type")
    var type: String? = null

    constructor() {}

    constructor(amount: Float, type: String) {
        this.amount = amount
        this.type = type
    }

    companion object {
        private const val serialVersionUID = -1764970284520387975L
    }
}