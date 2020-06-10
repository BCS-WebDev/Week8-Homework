
const Manager = require("./lib/Manager");  // load manager module
const Engineer = require("./lib/Engineer");  // load engineer module
const Intern = require("./lib/Intern");    // load inter module

const axios = require('axios');   // load axios module
const inquirer = require("inquirer");   // load inquirer module
const path = require("path");     // load path module
const fs = require("fs");       // load fs module

const OUTPUT_DIR = path.resolve(__dirname, "output");    // resolve path to output
const outputPath = path.join(OUTPUT_DIR, "team.html");   // join output_dir with 'team.html'

const render = require("./lib/htmlRenderer");   // load render module

// user prompts for base properties
const baseQuestions = [ 
    {   // name
        type: "input",
        message: "Enter an employee's name:",
        name: "name"
    },
    {   // id
        type: "input",
        message: "Enter the employee's id:",
        name: "id"
    },
    {   // email
        type: "input",
        message: "Enter the employee's email:",
        name: "email"
    },
    {   // role
        type: "list",
        message: "Enter the employee's role:",
        name: "role",
        choices: ["Manager", "Engineer", "Intern"]
    }
];

// create manager object
async function createManager({ name, id, email }) {
    try {
        const { officeNumber } = await inquirer.prompt({  // await user input for manager's office number
            type: "input",
            message: "Enter the manager's office number:",
            name: "officeNumber"
        });

        return new Manager(name, id, email, officeNumber);  // return new manager
    } catch(err) {
        console.log("Error: Employee not created - " + err);  // throw error if error
    }
}

// create engineer object
async function createEngineer({ name, id, email }) {
    try {
        const { github } = await inquirer.prompt({    // await user input for engineer's github
            type: "input",
            message: "Enter the engineers's github username:",
            name: "github"
        });

        await axios.get("https://api.github.com/users/" + github);

        return new Engineer(name, id, email, github);    // return new manager
    } catch(err) {
        console.log("Error: Employee not created - " + err);  // throw error if error
    }
}

// create intern object
async function createIntern({ name, id, email }) {    
    try {
        const { school } = await inquirer.prompt({   // await user input for intern's school
            type: "input",
            message: "Enter the intern's school:",
            name: "school"
        });

        return new Intern(name, id, email, school);   // return new manager
    } catch(err) { 
        console.log("Error: Employee not created - " + err);   // throw error if error
    }
}

// main loop for adding employees
async function createEmployees(team) {
    const base = await inquirer.prompt(baseQuestions);  // await user input from base questions
    
    switch (base.role) {   // use user input here for role because object has not been created yet
        case "Manager":
            const manager = await createManager(base);  // await manager creation
            if (manager) { team.push(manager); }    // if object was created, push to array

            break;
        case "Engineer":
            const engineer = await createEngineer(base);  // await engineer creation
            if (engineer) { team.push(engineer); }  // if object was created, push to array

            break;
        case "Intern":
            const intern = await createIntern(base);  // await intern creation
            if (intern) { team.push(intern); }  // if object was created, push to array

            break;
        default:   // never gets called - do nothing
            break;
    }

    const { addAnother } = await inquirer.prompt({   // get yes or no user input for add another employee
        type: "confirm",
        message: "Add another employee?",
        name: "addAnother"
    });

    if (addAnother) {  // if yes
        await createEmployees(team);  // recur
    } else {   // if no
        if (team.length === 0) {  // and array is empty
            console.log("Add at least one employee."); 
            await createEmployees(team);  // recur
        } else {  // and array is not empty
            return;   // return
        }
    }
}

// output directory
async function confirmOrMakeDir() {
    try {
        fs.accessSync(OUTPUT_DIR);   // check if output directory in current directory exists
    } catch(err) {
        fs.mkdirSync(OUTPUT_DIR);    // if no, make output directory
    }
}

// main function
async function init() {
    const team = [];     // initialize team array
    await createEmployees(team);   // pass team array to create employees loop

    const html = render(team);    // render html with team array
    
    await confirmOrMakeDir();     // make or confirm that output directory exists in current directory
    fs.writeFile(outputPath, html, function(err){    // write html tile to 'team.html' in output directory in current directory
        if (err) { console.log("Error: File could not be generated.") }   // throw error if error
        console.log("File 'team.html' generated in 'output' directory.") 
    });
}

init();   // start program