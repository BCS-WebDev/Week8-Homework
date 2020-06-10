// TODO: Write code to define and export the Employee class

const validator = require("email-validator");

class Employee {
    constructor(name = "anon", id = 0, email = "test@email.com") {
        if (typeof name !== "string" || !name.trim().length) {
            throw new Error("Expected parameter 'name' to be a non-empty string.");
        }
        
        if (typeof parseInt(id) !== "number" || isNaN(id) || id < 0) {
            throw new Error("Expected parameter 'id' to be a non-negative number.");
        }

        if (typeof email !== "string" || !email.trim().length) {
            throw new Error("Expected parameter 'email' to be a non-empty string.");
        }
        
        if (!validator.validate(email)) {
            throw new Error("Invalid email address.");
        }

        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return "Employee";
    }
}

module.exports = Employee;