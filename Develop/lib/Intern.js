// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");   // load employee module

// Intern class inherits from employee
class Intern extends Employee {  
    constructor(name, id, email, school) {   // added school property
        if (typeof school !== "string" || !school.trim().length) {  // check for non-empty string
            throw new Error("Expected parameter 'school' to be a non-empty string");  // throw error
        }
        
        super(name, id, email);   // construct employee base object
        this.school = school;     // set school property value
    }

    getSchool() {    // return school
        return this.school;
    }

    getRole() {    // return role
        return "Intern";
    }
}

module.exports = Intern;   // export intern