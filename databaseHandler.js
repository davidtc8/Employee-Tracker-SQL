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
            break;
        case 'Role':
            inquirer.prompt([
            {
                name: 'nameofRole',
                message: "What's the name of the role you want to add?",
            },
            {
                name: 'salary',
                message: "What's the salary for this role"
            },
            {
                type: 'list',
                name: 'departmentId',
                message: "What's the ID for this department",
                choices: ['Marketing', 'Legal', 'IT', 'HR', 'Directive Border']
            },
            ])
            .then((answer) => {
                console.log(`answer: ${answer}`)
                let departmentSelected;
                if (answer.departmentId === 'Marketing') {
                    departmentSelected = 1
                } else if (answer.departmentId === 'Legal') {
                    departmentSelected = 2
                } else if (answer.departmentId === 'IT') {
                    departmentSelected = 3
                } else if (answer.departmentId === 'HR') {
                    departmentSelected = 4
                } else {
                    departmentSelected = 5
                }
                query = `INSERT INTO roles (title, salary, department_id) VALUES ('${answer.nameofRole}', ${answer.salary}, ${departmentSelected})`
                // const params = answer.nameofRole;
                db.query(query, function (err, results) {
                    if (err) throw err;
                    console.table('Successfully added role')
                    return app.principalMenu();
                });
            });
            break;
        case 'Employee':
            inquirer.prompt([
                {
                    name: 'firstName',
                    message: "Employee First Name: ",
                },
                {
                    name: 'lastName',
                    message: "Employee Last Name: ",
                },
                {
                    name: 'roleID',
                    message: "What's the role ID for this employee (integer): ",
                },
                {
                    type: 'list',
                    name: 'managerID',
                    message: "What's the manager ID for this role: ",
                    choices: ['Big News Morgan', 'Akagami Shanks', 'Dr. Vegapunk', 'Silvers Rayleigh'],
                },
            ])
            .then((answer) => {
                console.log(`answer: ${answer}`)
                let managerSelected;
                if (answer.managerID === 'Big News Morgan') {
                    managerSelected = 3
                } else if (answer.managerID === 'Akagami Shanks') {
                    managerSelected = 6
                } else if (answer.managerID === 'Dr. Vegapunk') {
                    managerSelected = 9
                } else {
                    managerSelected = 12
                }
                query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', ${answer.roleID}, ${managerSelected})`
                // const params = answer.nameofRole;
                db.query(query, function (err, results) {
                    if (err) throw err;
                    console.table('Successfully added employee')
                    return app.principalMenu();
                });
            });
            break;
        default:
            console.log('There was an error')
            break;
    }
}

const update = (option) => {
    let query = ''
    console.log(`Add Function, you selected ${option}`)
    switch(option) {
        case 'Update an Employee Role':
            query = `SELECT * FROM employee;`;
            db.query(query, function (err, results) {
                if (err) throw err;
                console.table(results)
                inquirer.prompt([
                        {
                            type: 'input',
                            name: 'employeeID',
                            message: "What's the ID of the employee you want to update?",
                        },
                    ])
                    .then((answer) => {
                        let employeeID = answer.employeeID
                        query = `SELECT * FROM roles;`;
                        db.query(query, function (err, results) {
                            if (err) throw err;
                            console.table(results)
                            inquirer.prompt([
                                {
                                    type: 'input',
                                    name: 'roleID',
                                    message: "What's the ID of the role you want to update?",
                                },
                            ])
                            .then((answer) => {
                                query = `UPDATE employee SET role_id = (?) WHERE id = (?)`
                                db.query(query, [answer.roleID, employeeID], function (err, results) {
                                    if (err) throw err;
                                    console.table('Successfully updated role')
                                    return app.principalMenu(); 
                                    })
                                });
                            })
                    });
                })
            break;
        case 'Update an Employee Manager':
            // Viewing the employees and their managers
            query = `SELECT * FROM employee;`
            db.query(query, function (err, results) {
                if (err) throw err;
                console.table(results)
                inquirer.prompt([
                        {
                            type: 'input',
                            name: 'employeeID',
                            message: "What's the ID of the employee you want to update?",
                        },
                    ])
                    .then((answer) => {
                        let employeeID = answer.employeeID
                        query = `SELECT * FROM employee;`;
                        db.query(query, function (err, results) {
                            if (err) throw err;
                            console.table(results)
                            inquirer.prompt([
                                {
                                    type: 'input',
                                    name: 'managerID',
                                    message: "What's the ID of the manager you'd like to reassign this employee to?",
                                },
                            ])
                            .then((answer) => {
                                query = `UPDATE employee SET manager_id = (?) WHERE id = (?)`
                                db.query(query, [answer.managerID, employeeID], function (err, results) {
                                    if (err) throw err;
                                    console.table('Successfully updated role')
                                    return app.principalMenu(); 
                            })
                        });
                    })
            });
    })
        default:
            console.log('There was an error')
            break;
    }
}

const deleteOption = (option) => {
    let query = ''
    console.log(`Delete Function, you selected ${option}`)
    switch(option) {
        case 'Delete a department':
            inquirer.prompt({
                type: 'list',
                name: 'departmentId',
                message: "What department would you like to delete?",
                choices: ['Marketing', 'Legal', 'IT', 'HR', 'Directive Border']
            })
            .then((answer) => {
                console.log(`answer: ${answer.departmentId}`)
                let departmentSelected;
                if (answer.departmentId === 'Marketing') {
                    departmentSelected = 1
                } else if (answer.departmentId === 'Legal') {
                    departmentSelected = 2
                } else if (answer.departmentId === 'IT') {
                    departmentSelected = 3
                } else if (answer.departmentId === 'HR') {
                    departmentSelected = 4
                } else {
                    departmentSelected = 5
                }
                query = `DELETE FROM department WHERE id = ${departmentSelected}`
                // const params = answer.nameofRole;
                db.query(query, function (err, results) {
                    if (err) throw err;
                    console.table('Successfully deleted department')
                    return app.principalMenu();
                });
            });
            break;
        case 'Delete a role':
            query = `SELECT * FROM roles;`;
                db.query(query, function (err, results) {
                if (err) throw err;
                console.table(results)
            // });
            inquirer.prompt({
                type: 'input',
                name: 'roleID',
                message: "What's the ID of the role you'd like to delete?"
            })
            .then((answer) => {
                query = `DELETE FROM roles WHERE id = ${answer.roleID}`
                // const params = answer.nameofRole;
                db.query(query, function (err, results) {
                    if (err) throw err;
                    console.table('Successfully deleted role')
                    return app.principalMenu();
                    // Closing first db.query
                    });
                // Closing then
                });
            // Closing db.query
            });
            break;
        case 'Delete an employee':
            query = `SELECT * FROM employee;`;
                db.query(query, function (err, results) {
                if (err) throw err;
                console.table(results)
            // });
            inquirer.prompt({
                type: 'input',
                name: 'employeeID',
                message: "What's the ID of the employee you'd like to delete?"
            })
            .then((answer) => {
                query = `DELETE FROM roles WHERE id = ${answer.employeeID}`
                // const params = answer.nameofRole;
                db.query(query, function (err, results) {
                    if (err) throw err;
                    console.table('Successfully deleted employee')
                    return app.principalMenu();
                    // Closing first db.query
                    });
                // Closing then
                });
            // Closing db.query
            });
            break;
        default:
            console.log('There was an error')
            break;
    }
}

module.exports = {
    view: view,
    add: add,
    update: update,
    deleteOption: deleteOption
}