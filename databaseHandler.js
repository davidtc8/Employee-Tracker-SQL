const inquirer = require('inquirer');
const mysql = require('mysql2')
require('console.table')
require('dotenv').config();

const connection = require('./databaseConnection.js')
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
    console.log(option)
    switch(option) {
        case 'All Departments':
            // Creating the query as a string
            query = `SELECT id as Id, 
                    name as Department 
                    FROM department;`
            // Printing the query
            db.query(query, function (err, results) {
                console.table(results);
            });
            return;
        case 'All Roles':
            query = `SELECT role.id AS Id,
                     role.title AS Role,
                     role.salary AS Salary,
                     department.name AS Department
                     FROM ${option}
                     JOIN department ON role.department_id = department.id;`;
            break;
        case 'All Employees':
            query = `SELECT role.id AS Id,
                     CONCAT(employee.first_name, ' ', employee.last_name) AS Name,
                     role.title AS Role,
                     department.name AS Department,
                     role.salary AS Salary,
                     IF(employee.manager IS NULL, 'Manager', CONCAT(employee2.first_name, ' ', employee2.last_name)) AS Manager
                     FROM employee
                     JOIN role ON employee.role_id = role.id
                     LEFT JOIN employee employee2 ON employee.manager_id = employee2.id;`;
            break; 
        case 'Employees by Department':
            query = `SELECT employee.id AS Id
                     CONCAT(employee.first_name, ' ', employee.last_name) AS 'Employee Name',
                     department.name AS Department
                     FROM employee
                     JOIN role
                     JOIN department ON employee.role_id = role.id AND role.department_id = department.id ORDER BY department.id;`;
            break;
        case 'Employees by Manager':
            query = `SELECT employee1.id AS Id,
                     CONCAT(employee1.first_name, ' ', 'employee1.last_name) AS Employee Name,
                     IF(employee1.manager_id IS NULL, 'Manager', CONCAT(employee2.first_name, ' ', employee2.last_name)) AS Manager
                     FROM employee employee1
                     LEFT JOIN employee employee2 ON employee1.manager_id = employee2.id ORDER BY employee2.id;`;
            break;
        case 'Budget of a Department' :
            query = `SELECT department.id AS Id,
                     department.name AS Department,
                     SUM(role.salary) AS Budget
                     FROM employee
                     JOIN role
                     JOIN department ON employee.role_id = role.id AND role.department_id = department.id
                     GROUP BY department.id;`;
            break;     
    }
}

const add = (option) => {
    let query = ''
    console.log(option)
    // switch(option) {
    //     case 'Department':
    //         inquirer.prompt({
    //             type: 'input',
    //             name: 'nameofDept',
    //             message: "What's the name of the department you want to add?",
    //         })
    //         .then((answer) => {
    //             query = `INSERT INTO department (name) VALUES (?)`
    //             const params = answer.nameofDept;
    //             db.query(query, params, function (err, results) {
    //                 console.table('Successfully added the department');
    //             });
    //         })
    //         return;
    //     default:
    //         console.log('hi')
    //         break;
    // }
    if(option === 'Department') {
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
        });
        })
        return;
    }
}

module.exports = {
    view: view,
    add: add
}