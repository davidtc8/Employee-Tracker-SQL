const inquirer = require('inquirer');
const db = require('./databaseHandler.js')

// Display principal menu
const principalMenu = () => {
    inquirer.prompt({
        type: 'list',
        name: 'principalMenu',
        message: 'What would you like to do?',
        choices: ['View', 'Add', 'Update', 'Delete', 'Exit']
    })
    .then((answer) => {
        switch(answer.principalMenu) {
            // View option
            case 'View':
                showMenu();
                break;
            // Add option
            case 'Add':
                add();
                break;
            // Update option
            case 'Update':
                update();
                break;
            // Delete option
            case 'Delete':
                deleteSQL();
                break;
            default:
                process.exit();
        }
    });
};

// Display the MENU
const showMenu = () => {
    inquirer.prompt({
        type: 'list',
        name: 'viewMenu',
        message: 'Viewing',
        choices: ['All Departments', 
                  'All Roles', 
                  'All Employees',
                  'Employees by Department',
                  'Employees by Manager',
                  'Budget of a Department',
                   '<< Go Back']
    })
    .then((answer) => {
        if (answer.viewMenu === '<< Go Back'){return principalMenu();}
        db.view(answer.viewMenu)
    });
}

// Calling the add function
const add = () => {
    inquirer.prompt({
        type: 'list',
        name: 'addtoDatabase',
        message: 'viewing',
        choices: ['Department', 'Role', 'Employee', '<< Go Back']
    })
    .then((answer) => {
        if (answer.addtoDatabase === '<< Go Back'){return principalMenu();}
        db.add(answer.addtoDatabase)
    });
}

// Calling the update function
const update = () => {
    inquirer.prompt({
        type: 'list',
        name: 'updateTable',
        message: 'viewing',
        choices: ['Update an Employee Role', 'Update an Employee Manager', '<< Go Back']
    })
    .then((answer) => {
        if (answer.updateTable === '<< Go Back'){return principalMenu();}
        db.update(answer.updateTable)
    });
};

// Calling the delete function
const deleteSQL = () => {
    inquirer.prompt({
        type: 'list',
        name: 'deleteOption',
        message: 'viewing',
        choices: ['Delete a department','Delete a role', 'Delete an employee', '<< Go Back']
    })
    .then((answer) => {
        if (answer.deleteOption === '<< Go Back'){return principalMenu();}
        db.deleteOption(answer.deleteOption)
    })
}

// Initialize the principal menu
principalMenu();

module.exports.principalMenu = principalMenu;