// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");   // load employee module

// Engineer class inherits from Employee
class Engineer extends Employee {
    constructor(name, id, email, github) {  // added github property
        if (typeof github !== "string" || !github.trim().length) {   // checks for non-empty string
            throw new Error("Expected parameter 'github' to be a non-empty string");  // throw error
        }

        super(name, id, email);  // construct employee base object
        this.github = github;    // set github property value
    }

    getGithub() {   // return github
        return this.github;
    }

    getRole() {    // return role - override
        return "Engineer";
    }
}

module.exports = Engineer;   // export engineer class