// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require("./Employee");   // load employee module

// Manager inherits from employee class
class Manager extends Employee {
    constructor(name, id, email, officeNumber = 0) {  // added office number property
        if (typeof parseInt(officeNumber) !== "number" || isNaN(officeNumber) || officeNumber < 0) {   // check for non-negative number
            throw new Error("Expected parameter 'officeNumber' to be a non-negative number");    // throw error
        }

        super(name, id, email);    // construct employee base object
        this.officeNumber = officeNumber;    // set office number
    }

    getOfficeNumber() {    // return office number
        return this.officeNumber;
    }

    getRole() {     // return role
        return "Manager";
    }
}

module.exports = Manager;