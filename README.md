# Team Profile Generator
BootCampSpot Web Development - Week 8 Homework

## Notes on Team Profiles & CLI Applications
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Team profiles can be useful in organizing members of
a team into a single view. These member's data can be stored into objects for quick access
to info such as their github, office number, email, and id. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This particular project will generate a team profile via a 
command-line application. Users will interact with these programs entirely through their terminal
and shell, which was necessary since early days of computers when graphical interfaces were
not available. In our previous projects, we ran our javascript files through a web browser,
however, with node, we can now run our javascript files via node. 

## Motive & Action
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; We will be creating this team profile generator with the help
of some node packages, namely: inquirer for prompting questions, axios for github ajax request,
email-validator to validate emails, path to resolve directory paths, and jest to run tests. These
packages will be installed via the node package manager. And as done in our previous project, we
will be using nested async/await functions to implement a sequential flow.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Furthermore, we will be introducing our own errors into 
the application to check for invalid data and stop construction of objects. This way, we can
ensure that the user has a way to re-enter employees without having to start over. 

## Installation
Install `node.js` and run `npm install` under the Develop directory to install the necessary node packages.

* Installs:
    - axios node package 
    - inquirer node package
    - email-validator node package 
    - path node package
    - jest node package

## Usage
Run `node app.js` from the Develop directory and answer the following prompts.

* Generates:
    - 'team.html' in 'output' directory

* NOTE: style.css file is missing.

## Questions
Contact: kevin1choi@gmail.com