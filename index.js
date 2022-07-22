const inquirer = require('inquirer');
require("console.table");
const mysql = require("mysql");

// mysql connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'icameisawiconquered',
    database: 'employee_db'
});

// user is prompted to choose what they would first like to do
function initialQuestion() {
    inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'menu',
        choices: ["View all departments", "View all roles", "View all employees", "Add an employee", "Update an employee role", "Quit"]
    })
   
};

