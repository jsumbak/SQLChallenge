const inquirer = require('inquirer');
const table = require("console.table");
const mysql = require('mysql2');

// mysql connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'password5',
    database: 'employee_db'
});

// user is prompted to choose what they would first like to do
function menu() {
    inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'menu',
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Quit"]
    }).then((answers) => {
        console.log(answers);

        if (answers.menu === "View all departments") {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Departments: ");
                console.table(result);
                // employee_db();
            });
        } else if (answers.menu === "View all roles") {
            db.query(`SELECT * FROM roles`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Roles: ");
                console.table(result);
                // employee_db();
            });
        } else if (answers.menu === "View all employees") {
            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Employees: ");
                console.table(result);
                // employee_db();
            });
        } else if (answers.menu === "Add a department") { //adding department
            inquirer.prompt([{
                type: 'input',
                name: 'department',
                message: 'What is the name of the department?',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    } else {
                        console.log('Please add department name.');
                        return false;
                    }
                }
            }])
                .then((answers) => {
                    db.query(`INSERT INTO department (name) VALUES (?)`, [answers.department], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.department} to the database.`)
                        // employee_db();
                    });
                })
        } else if (answers.menu === "Add a role") { //adding role
            db.query(`SELECT * FROM roles`, (err, result) => {
                if (err) throw err;
                inquirer.prompt([{
                    type: 'input',
                    name: 'role',
                    message: 'What is the name of the role?',
                    validate: rolesInput => {
                        if (rolesInput) {
                            return true;
                        } else {
                            console.log('Please add role name.');
                            return false;
                        }
                    }
                }])
                    .then((answers) => {
                        db.query(`INSERT INTO roles (title) VALUES (?)`, [answers.roles], (err, result) => {
                            if (err) throw err;
                            console.log(`Added ${answers.roles} to the database.`)
                            // employee_db();
                        });
                    })
            });

        } else if (answers.menu === "Add an employee") {  //adding employee first name
            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) throw err;
                inquirer.prompt([{
                    type: 'input',
                    name: 'employee',
                    message: 'Please insert employee first name.',
                    validate: employeeInput => {
                        if (employeeInput) {
                            return true;
                        } else {
                            console.log('Please add employee name.');
                            return false;
                        }
                    }
                },
                {
                    // Adding Employee Last Name
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the employees last name?',
                    validate: lastNameInput => {
                        if (lastNameInput) {
                            return true;
                        } else {
                            console.log('Please add a last name!');
                            return false;
                        }
                    }
                },
                {
                    // Adding Employee Role
                    type: 'list',
                    name: 'role',
                    message: 'What is the employees role?', // WORK ON THIS
                    validate: rolesInput => {
                        if (rolesInput) {
                            return true;
                        } else {
                            console.log('Please add an employee role.');
                            return false;
                        }
                    }
                },
                {
                    // Adding Employee Manager
                    type: 'input',
                    name: 'manager',
                    message: 'Who is the employees manager?',
                    validate: managerInput => {
                        if (managerInput) {
                            return true;
                        } else {
                            console.log('Please add a amanager!');
                            return false;
                        }
                    }
                }
                ]).then((answers) => {
                    // Comparing the result and storing it into the variable
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].title === answers.roles) {
                            var roles = result[i];
                        }
                    }
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, role.id, answers.manager.id], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`)
                        employee_tracker();
                    });
                })
            })
        } else if (answers.menu === "Update an employee role") {
            db.query(`SELECT * FROM employee`, (err, res) => {
                console.log(res) //TODO: handle errors
                const employeeList = res.map(({ id, first_name, last_name }) => ({
                    name: first_name + " " + last_name,
                    value: id
                }))
                console.log(employeeList)
                inquirer.prompt({
                    type: 'list',
                    name: 'employeeId',
                    message: 'Choose an employee to update.',
                    choices: employeeList
                }).then(selectedEmployee => {
                    console.log('Prompt res:', selectedEmployee)
                    db.query(`SELECT * FROM roles`, (err, roles) => {
                        if (err) throw err;
                        const roleList = roles.map(({ id, title }) => ({
                            name: title,
                            value: id
                        }))
                        inquirer.prompt({
                            type: 'list',
                            name: 'roleId',
                            message: 'Which role do you want to assign the selected employee?',
                            choices: roleList
                        }).then(selectedRole => {
                            console.log(selectedRole)
                            db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [selectedRole.roleId, selectedEmployee.employeeId], (err, updateRes) => {
                                if (err) {
                                    console.error('Error occured while updating employee role.')
                                    throw err
                                }
                                console.log(err)
                                console.log(updateRes)
                            })
                        })
                    })
                })
            })
        } else if (answers.menu === "Quit") {
            db.end();
        }
    })
}

menu()