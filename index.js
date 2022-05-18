console.log("running")

const inquirer = require('inquirer');
const db = require('./config/connection');
const mysql = require('mysql2');




function askQuestion() {
    inquirer.prompt([
        {
            name: "question",
            type: "list",
            message: "What would you like to do?",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "quit"]
        }
    ]).then(answers => {
        switch (answers.question) {
            case "view all departments":
                viewAll("department");
                break;

            case "view all roles":
                viewAll("role");
                break;

            case "view all employees":
                viewAll("employee");
                break;

            case "add a department":
                addDept()
                break;

            case "add a role":
                addRole()
                break;

            case "add an employee":
                addEmployee()
                break;

            case "update an employee role":
                updateRole()
                break;

            case "quit":
                quit()
                break;

            default:
                break;
        }
    })
}

const viewAll = (table) => {
    let query;
    if (table === "department") {
      query = `SELECT * FROM department;`;
    } else if (table === "role") {
      query = `SELECT * FROM role;`;
    } else {//employee
      query = `SELECT * FROM employee;`;
    }
    db.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
  
      askQuestion();
    });
  };



function viewEmpl() {
    inquirer.prompt({
        name: "name",
        message: "What is your name?",
        type: "input"
    }).then(({ name }) => {
        console.log(name);
        const me = new Trainer(name);
        trainers.push(me)
        console.log(trainers);
        askQuestion();
    })
}

function viewRoles() {
    inquirer.prompt({
        name: "name",
        message: "What is your name?",
        type: "input"
    }).then(({ name }) => {
        console.log(name);
        const me = new Trainer(name);
        trainers.push(me)
        console.log(trainers);
        askQuestion();
    })
}


function addDept() {
    inquirer.prompt({
        name: "name",
        message: "What is your name?",
        type: "input"
    }).then(({ name }) => {
        console.log(name);
        const me = new Trainer(name);
        trainers.push(me)
        console.log(trainers);
        askQuestion();
    })
}

function addRole() {
    inquirer.prompt({
        name: "name",
        message: "What is your name?",
        type: "input"
    }).then(({ name }) => {
        console.log(name);
        const me = new Trainer(name);
        trainers.push(me)
        console.log(trainers);
        askQuestion();
    })
}

function addEmployee() {
    inquirer.prompt({
        name: "name",
        message: "What is your name?",
        type: "input"
    }).then(({ name }) => {
        console.log(name);
        const me = new Trainer(name);
        trainers.push(me)
        console.log(trainers);
        askQuestion();
    })
}

function updateRole() {
    inquirer.prompt({
        name: "name",
        message: "What is your name?",
        type: "input"
    }).then(({ name }) => {
        console.log(name);
        const me = new Trainer(name);
        trainers.push(me)
        console.log(trainers);
        askQuestion();
    })
}

askQuestion();