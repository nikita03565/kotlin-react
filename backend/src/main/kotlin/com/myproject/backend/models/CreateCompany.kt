package com.myproject.backend.models

import com.fasterxml.jackson.annotation.JsonProperty
import java.io.Serializable

class CreateCompany : Serializable {

    @JsonProperty("name")
    var name: String = ""

    constructor() {}

    constructor(name: String) {
        this.name = name
    }

    companion object {
        private const val serialVersionUID = -1764970284520387975L
    }
}

