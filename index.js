// global variables
const fs = require('fs');
const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generatePage = require('./src/page-template');
const writeFile = require('./utils/generate-site.js');
const employeeList = [];

// initial questions when first initializing application
const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of the team manager?',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter the name of the team manager.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the ID of the team manager?',
        validate: (idInput) => {
            if (isNaN(idInput)) {
                return "Please enter a valid ID.";
            }
            return true;
        },
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the email of the team manager?',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('Please enter the email of the team manager.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'What is the office number of the team manager?',
        validate: (officeNumberInput) => {
            if (isNaN(officeNumberInput)) {
                return "Please enter a valid office number.";
            }
            return true;
        },
    }
];

// ask what next step would be after adding Manager information
const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'nextStep',
            message: 'Which of the following steps would you like to do next?',
            choices: [
                "Add an engineer.",
                "Add an intern.",
                "Finish building my team."
            ]

        }
    ])
    .then(data => {
        // go to next step depending on what the user input is
        switch (data.nextStep) {
            case 'Add an engineer.':
                addEngineer();
                break;
            case 'Add an intern.':
                addIntern();
                break;
            case 'Finish building my team.':
                const pageHtml = generatePage(employeeList);
                writeFile(pageHtml);
                break;
        }
    }) 
};

const addEngineer = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the engineer?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter the name of the engineer.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the ID of the engineer?',
            validate: (idInput) => {
                if (isNaN(idInput)) {
                    return "Please enter a valid ID.";
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email of the engineer?',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('Please enter the email of the engineer.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'username',
            message: "What is the GitHub username of the engineer?",
            validate: usernameInput => {
                if (usernameInput) {
                    return true;
                } else {
                    console.log('Please enter the GitHub username of the engineer.');
                    return false;
                }
            }
        }
    ])
    .then(data => {
        const teamMember = new Engineer(data);
        console.log(data);
        console.log(teamMember.role);
        employeeList.push(teamMember);
        console.log(employeeList);
        addEmployee();
    })
};

const addIntern = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the intern?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter the name of the intern.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the ID of the intern?',
            validate: (idInput) => {
                if (isNaN(idInput)) {
                    return "Please enter a valid ID.";
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email of the intern?',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('Please enter the email of the intern.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: "What is the school of the intern?",
            validate: schoolInput => {
                if (schoolInput) {
                    return true;
                } else {
                    console.log('Please enter the school of the intern.');
                    return false;
                }
            }
        }
    ])
    .then(data => {
        const teamMember = new Intern(data);
        console.log(data);
        console.log(teamMember.role);
        employeeList.push(teamMember);
        console.log(employeeList);
        addEmployee();
    })
};

// function to initialize app
function init() {
    return inquirer.prompt(managerQuestions);
};

init()
    .then(data => {
        return new Manager(data);
    })
    .then(data => {
        const managerEntry = data;
        console.log(data);
        employeeList.push(managerEntry);
        console.log(employeeList);
    })
    .then(addEmployee)
    .catch(err => {
        console.log(err);
    });