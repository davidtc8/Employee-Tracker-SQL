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
            case 'View':
                showMenu();
                break;
            case 'Add':
                add();
                break;
            // create an add Menu
            // create an update Menu
            // create a Delete Menu
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
        if (answer.viewMenu === 'back'){return principalMenu();}
        db.view(answer.viewMenu)
    });
}

const add = () => {
    inquirer.prompt({
        type: 'list',
        name: 'addtoDatabase',
        message: 'viewing',
        choices: ['Department', 'Role', 'Employee', '<< Go Back']
    })
    .then((answer) => {
        if (answer.addtoDatabase === 'back'){return principalMenu();}
        db.add(answer.addtoDatabase)
    })
}

// Initialize the principal menu
principalMenu();

module.exports.principalMenu = principalMenu;