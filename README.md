# Employee-Tracker# 12 SQL: Employee Tracker


FIRST THINGS FIRST!
1. you must have nodejs, inquirer and mysql downloaded onto your computer for this application to run.
2. after cloning this repo to your computer, open up the terminal and type:       mysql -u root -p         and then type your password on the password prompt
3. you should see:     mysql>
4. type:   SOURCE ./db/schema.sql      this creates the employee database and tables
5. type:   SOURCE ./db/seed.sql        this creates depts, roles and employees to fill those tables
6. SPLIT the terminal and in the NEW TERMINAL WINDOW type:    npm i     this downloads the packages necessary for the functioning of this application.
7. type:    node index.js      to run this program
8. follow the prompts!


## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```


## Bonus/future goals

Try to add some additional functionality to your application, such as the ability to do the following:

* Update employee managers.

* View employees by manager.

* View employees by department.

* Delete departments, roles, and employees.

* View the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department.




* A walkthrough video link: https://drive.google.com/file/d/142FSywBNw2KAxInaYr0-cvJkGZAZaGhL/view?usp=sharing 

* The URL of the GitHub repository: https://github.com/Jnbanks/Employee-Tracker



