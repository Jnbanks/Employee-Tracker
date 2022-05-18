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
  const addEmployee = () => {
    db.query("SELECT * FROM employee", (err, eRes) => {
      if (err) throw err;
      const employeeChoice = [
        {
          name: 'None',
          value: 0
        }
      ];
      eRes.forEach(({ first_name, last_name, id }) => {
        employeeChoice.push({
          name: first_name + " " + last_name,
          value: id
        });
      });
      
      db.query("SELECT * FROM role", (err, rolRes) => {
        if (err) throw err;
        const roleChoice = [];
        rolRes.forEach(({ title, id }) => {
          roleChoice.push({
            name: title,
            value: id
            });
          });
       
        let questions = [
          {
            type: "input",
            name: "first_name",
            message: "what is the employee's first name?"
          },
          {
            type: "input",
            name: "last_name",
            message: "what is the employee's last name?"
          },
          {
            type: "list",
            name: "role_id",
            choices: roleChoice,
            message: "what is the employee's role?"
          },
          {
            type: "list",
            name: "manager_id",
            choices: employeeChoice,
            message: "who is the employee's manager? (could be null)"
          }
        ]
    
        inquirer.prompt(questions)
          .then(response => {
            const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)`;
            let manager_id = response.manager_id !== 0? response.manager_id: null;
            db.query(query, [[response.first_name, response.last_name, response.role_id, manager_id]], (err, res) => {
              if (err) throw err;
              console.log(`inserted employee ${response.first_name} ${response.last_name} with id ${res.insertId}`);
              askQuestion();
            });
          })
          .catch(err => {
            console.error(err);
          });
      })
    });
  }

  // -- UPDATE ROLE
  const updateRole = () => {
    db.query("SELECT * FROM employee", (err, eRes) => {
      if (err) throw err;
      const empSelect = [];
      eRes.forEach(({ first_name, last_name, id }) => {
        empSelect.push({
          name: first_name + " " + last_name,
          value: id
        });
      });
      
      db.query("SELECT * FROM role", (err, rolRes) => {
        if (err) throw err;
        const roleSelect = [];
        rolRes.forEach(({ title, id }) => {
          roleSelect.push({
            name: title,
            value: id
            });
          });
       
        let questions = [
          {
            type: "list",
            name: "id",
            choices: empSelect,
            message: "whose role do you want to update?"
          },
          {
            type: "list",
            name: "role_id",
            choices: roleSelect,
            message: "what is the employee's new role?"
          }
        ]
    
        inquirer.prompt(questions)
          .then(response => {
            const query = `UPDATE employee SET ? WHERE ?? = ?;`;
            db.query(query, [
              {role_id: response.role_id},
              "id",
              response.id
            ], (err, res) => {
              if (err) throw err;
              
              console.log("updated employee's role!");
              askQuestion();
            });
          })
          .catch(err => {
            console.error(err);
          });
        })
    });
  }

askQuestion();