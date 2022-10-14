const inquirer = require('inquirer');
const mysql = require('mysql2')
require('console.table')
require('dotenv').config();

// const connection = require('./databaseConnection.js')
const app = require('./index.js')

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
    },
    console.log('Connected to database.')
)

db.connect(err => {
    if (err) {
        console.log(err)
        throw err};
});

// Get data from the DB for the VIEW option on the principal menu
const view = (option) => {
    let query = '';
    console.log(`View Function, you selected ${option}`)
    switch(option) {
        case 'All Departments':
            // Creating the query as a string
            query = `SELECT id as Id, 
                    name as Department 
                    FROM department;`
            break;
        case 'All Roles':
            query = `SELECT roles.id AS Id,
                     roles.title AS Role,
                     roles.salary AS Salary,
                     department.name AS Department
                     FROM roles
                     JOIN department ON roles.department_id = department.id;`;
            break;
        case 'All Employees':
            query = `SELECT roles.id AS Id,
                     CONCAT(employee.first_name, ' ', employee.last_name) AS Name,
                     roles.title AS Role,
                     department.name AS Department,
                     roles.salary AS Salary,
                     IF(employee.manager_id IS NULL, 'Does not have a manager', CONCAT(employee2.first_name, ' ', employee2.last_name)) AS Manager
                     FROM employee
                     JOIN roles ON employee.role_id = roles.id
                     JOIN department ON roles.department_id = department.id
                     LEFT JOIN employee employee2 ON employee.manager_id = employee2.id;`;
            break; 
        case 'Employees by Department':
            query = `SELECT employee.id AS Id,
                     CONCAT(employee.first_name, ' ', employee.last_name) AS 'Employee Name',
                     department.name AS Department
                     FROM employee
                     JOIN roles
                     JOIN department ON employee.role_id = roles.id AND roles.department_id = department.id ORDER BY department.id;`;
            break;
        case 'Employees by Manager':
            query = `SELECT employee1.id AS Id,
                     CONCAT(employee1.first_name, ' ', employee1.last_name) AS EmployeeName,
                     IF(employee1.manager_id IS NULL, 'They are bound to no one', CONCAT(employee2.first_name, ' ', employee2.last_name)) AS Manager
                     FROM employee employee1
                     LEFT JOIN employee employee2 ON employee1.manager_id = employee2.id ORDER BY employee2.id;`;
            break;
        case 'Budget of a Department' :
            query = `SELECT department.id AS Id,
                     department.name AS Department,
                     SUM(roles.salary) AS Budget
                     FROM employee
                     JOIN roles
                     JOIN department ON employee.role_id = roles.id AND roles.department_id = department.id
                     GROUP BY department.id;`;
            break;     
    }
    db.query(query, (err, results) => {
        if (err) {console.log(err); return app.principalMenu();}
        // If everything goes well, print this
        console.table(results);
        console.log('Going back to menu')
        return app.principalMenu();
    });
}

const add = (option) => {
    let query = ''
    console.log(`Add Function, you selected ${option}`)
    switch(option) {
        case 'Department':
            inquirer.prompt({
                type: 'input',
                name: 'nameofDept',
                message: "What's the name of the department you want to add?",
            })
            .then((answer) => {
                query = `INSERT INTO department (name) VALUES (?)`
                const params = answer.nameofDept;
                db.query(query, params, function (err, results) {
                    console.table('Successfully added the department');
                    return app.principalMenu();
                });
            })
        case 'Role':
            inquirer.prompt({
                type: 'input',
                name: 'nameofRole',
                message: "What's the name of the role you want to add?",
            })
            .then((answer) => {
                query = 'INSERT INTO roles (name) VALUES (?)'
                const params = answer.nameofRole;
                db.query(query, params, function (err, results) {
                    console.table('Successfully added role')
                    return app.principalMenu();
                });
            });
        default:
            console.log('There was an error')
            break;
    }
}

module.exports = {
    view: view,
    add: add
}