// TODO: Write code to define and export the Employee class

const validator = require("email-validator");  // load email-validator module

// Employee parent class
//  - will be base class of manager, engineer, intern classes
class Employee {
    constructor(name = "anon", id = 0, email = "test@email.com") {  // initialized constructors to pass tests with data validation
        if (typeof name !== "string" || !name.trim().length) {    // check for non-empty string
            throw new Error("Expected parameter 'name' to be a non-empty string.");    // throw error
        }
        
        if (typeof parseInt(id) !== "number" || isNaN(id) || id < 0) {  // check for non-negative number
            throw new Error("Expected parameter 'id' to be a non-negative number.");   // throw error
        }

        if (typeof email !== "string" || !email.trim().length) {    // check for non-empty string
            throw new Error("Expected parameter 'email' to be a non-empty string.");   // throw error
        }
        
        if (!validator.validate(email)) {    // check if email valid using email-validator
            throw new Error("Invalid email address.");   // throw error
        }

        this.name = name;   // set name property value
        this.id = id;    // set id property value
        this.email = email;  // set email property value
    }

    getName() {    // return name
        return this.name;
    }

    getId() {     // return id
        return this.id;
    }

    getEmail() {   // return email
        return this.email;
    }

    getRole() {    // return role
        return "Employee";
    }
}

module.exports = Employee;   // export employee class