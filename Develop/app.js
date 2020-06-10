
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const axios = require('axios'); 
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

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

async function createManager({ name, id, email }) {
    try {
        const { officeNumber } = await inquirer.prompt({
            type: "input",
            message: "Enter the manager's office number:",
            name: "officeNumber"
        });

        return new Manager(name, id, email, officeNumber);
    } catch(err) {
        console.log("Error: Employee not created - " + err);
    }
}

async function createEngineer({ name, id, email }) {
    try {
        const { github } = await inquirer.prompt({
            type: "input",
            message: "Enter the engineers's github username:",
            name: "github"
        });

        await axios.get("https://api.github.com/users/" + github);

        return new Engineer(name, id, email, github);
    } catch(err) {
        console.log("Error: Employee not created - " + err);
    }
}

async function createIntern({ name, id, email }) {
    try {
        const { school } = await inquirer.prompt({
            type: "input",
            message: "Enter the intern's school:",
            name: "school"
        });

        return new Intern(name, id, email, school);
    } catch(err) {
        console.log("Error: Employee not created - " + err);
    }
}

async function createEmployees(team) {
    const base = await inquirer.prompt(baseQuestions);
    
    switch (base.role) {
        case "Manager":
            const manager = await createManager(base);
            if (manager) { team.push(manager); }

            break;
        case "Engineer":
            const engineer = await createEngineer(base);
            if (engineer) { team.push(engineer); }

            break;
        case "Intern":
            const intern = await createIntern(base);
            if (intern) { team.push(intern); }

            break;
        default:
            break;
    }

    const { addAnother } = await inquirer.prompt({
        type: "confirm",
        message: "Add another employee?",
        name: "addAnother"
    });

    if (addAnother) {
        await createEmployees(team);
    } else {
        if (team.length === 0) {
            console.log("Add at least one employee.")
            await createEmployees(team);
        } else {
            return;
        }
    }
}

async function confirmOrMakeDir() {
    try {
        fs.accessSync(OUTPUT_DIR);
    } catch(err) {
        fs.mkdirSync(OUTPUT_DIR);
    }
}

async function init() {
    const team = [];
    await createEmployees(team);

    const html = render(team);
    
    await confirmOrMakeDir();
    fs.writeFile(outputPath, html, function(err){
        if (err) { console.log("Error: File could not be generated.") }
        console.log("File 'team.html' generated in 'output' directory.")
    });
}

init();