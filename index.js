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

// -- VIEW DEPARTMENT, ROLE OR EMPLOYEE TABLE
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

// -- ADD DEPARTMENT
const addDept = () => {
    let questions = [
      {
        type: "input",
        name: "name",
        message: "What is the name of this new department?"
      }
    ];
  
    inquirer.prompt(questions)
    .then(response => {
      const query = `INSERT INTO department (name) VALUES (?)`;
      db.query(query, [response.name], (err, res) => {
        if (err) throw err;
        console.log(`Inserted the ${response.name} department at id ${res.insertId}`);
        askQuestion();
      });
    })
    .catch(err => {
      console.error(err);
    });
  }

// -- ADD ROLE
const addRole = () => {
    const departments = [];
    db.query("SELECT * FROM department", (err, res) => {
      if (err) throw err;
  
      res.forEach(dep => {
        let deptObj = {
          name: dep.name,
          value: dep.id
        }
        departments.push(deptObj);
        console.log(deptObj);
      });
  
      let questions = [
        {
          type: "input",
          name: "title",
          message: "what is the title of the new role?"
        },
        {
          type: "input",
          name: "salary",
          message: "what is the salary of the new role?"
        },
        {
          type: "list",
          name: "department",
          choices: departments,
          message: "which department is this role in?"
        }
      ];
  
      inquirer.prompt(questions)
      .then(response => {
        const query = `INSERT INTO role (title, salary, department_id) VALUES (?)`;
        db.query(query, [[response.title, response.salary, response.department]], (err, res) => {
          if (err) throw err;
          console.log(`Inserted ${response.title} role at id ${res.insertId}`);
          askQuestion();
        });
      })
      .catch(err => {
        console.error(err);
      });
    });
  }

  // -- ADD EMPLOYEE
  

askQuestion();