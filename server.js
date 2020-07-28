const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const promisemysql = require("promise-mysql");

const connectionProperties = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Bio_medical23",
    database: "all_employees"
};

const connection = mysql.createConnection(connectionProperties);

// establishes connection to db
connection.connect(err => {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
    mainMenu();
});

function mainMenu() {
    inquirer
        .prompt({
            name: "userAction",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all employees",
                "View all roles",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update employee role",
                "Update employee manager",
                "Delete employee",
                "Delete role",
                "Delete department",
                "Exit"
            ]
        })

        .then(response => {
            switch (response.userAction) {
                case "View all departments":
                    viewDepartments();
                    break;
                case "View all employees":
                    viewEmployees();
                    break;
                case "View all roles":
                    viewRoles();
                    break;
                case "Add a department":
                    addDept();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Update employee role":
                    updateEmpRole();
                    break;
                case "Update employee manager":
                    updateEmpMngr();
                    break;
                case "Delete employee":
                    deleteEmployee();
                    break;
                case "Delete role":
                    deleteRole();
                    break;
                case "Delete department":
                    deleteDepartment();
                    break;
                case "Exit":
                    connection.end();
                    break;
            }
        });

    function viewDepartments() {
        let query = "SELECT * FROM  departments";
        connection.query(query, function(err, res) {
            console.table(res);
            mainMenu();
        });
    };

    function viewEmployees() {
        let query = "SELECT * FROM  employee";
        connection.query(query, function(err, res) {
            console.table(res);
            mainMenu();
        });
    };

    function viewRoles() {
        let query = "SELECT * FROM  roles";
        connection.query(query, function(err, res) {
            console.table(res);
            mainMenu();
        });
    };

    function addDept() {
        inquirer
            .prompt([
                {
                    name: "deptID",
                    type: "input",
                    message: "What is the ID of the new department?",
                },
                {
                    name: "deptName",
                    type: "input",
                    message: "What is the name of the new department?",
                }
            ])

            .then(function(response) {
                connection.query("INSERT INTO departments SET ?", {
                        id: response.deptID,
                        department_name: response.deptName,
                    },
                    function(err) {
                        if (err) throw err;
                        console.log("Your department was created successfully!");
                        mainMenu();
                    }
                );
            });
    };

    function addRole() {
        inquirer
            .prompt([
                {
                    name: "roleID",
                    type: "input",
                    message: "What is the ID of the new role?",
                },
                {
                    name: "roleTtile",
                    type: "input",
                    message: "What is the title of the new role?",
                },
                {
                    name: "roleSalary",
                    type: "input",
                    message: "What is the salary of the new role?",
                },
                {
                    name: "roleDepartment",
                    type: "input",
                    message: "What is the department ID of the new role?",
                }
            ])

            .then(function(response) {
                connection.query("INSERT INTO roles SET ?", {
                        id: response.roleID,
                        title: response.roleTtile,
                        salary: response.roleSalary,
                        department_id: response.roleDepartment,
                    },
                    function(err) {
                        if (err) throw err;
                        console.log("Your new role was created successfully!");
                        mainMenu();
                    }
                );
            });
    };

    function addEmployee() {
        inquirer
            .prompt([
                {
                    name: "employeeID",
                    type: "input",
                    message: "What is the ID of the new employee?",
                },
                {
                    name: "empFirstName",
                    type: "input",
                    message: "What is the first name of the new employee?",
                },
                {
                    name: "empLastName",
                    type: "input",
                    message: "What is the last name of the new employee?",
                },
                {
                    name: "empRole",
                    type: "input",
                    message: "What is the role ID for the new employee?",
                },
                {
                    name: "empManager",
                    type: "input",
                    message: "What is id of the new employee's manager?",
                }
            ])

            .then(function(response) {
                connection.query("INSERT INTO employee SET ?", {
                        id: response.employeeID,
                        first_name: response.empFirstName,
                        last_name: response.empLastName,
                        role_id: response.empRole,
                        manager_id: response.empManager,
                    },
                    function(err) {
                        if (err) throw err;
                        console.log("Your new employee was created successfully!");
                        mainMenu();
                    }
                );
            });
    };

    function updateEmpRole() {

        // create employee and role array
        let employeeArr = [];
        let roleArr = [];

        // Create connection using promise-sql
        promisemysql.createConnection(connectionProperties
        ).then((conn) => {
            return Promise.all([

                // query all roles and employee
                conn.query('SELECT id, title FROM roles ORDER BY title ASC'),
                conn.query("SELECT employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS Employee FROM employee ORDER BY Employee ASC")
            ]);
        }).then(([roles, employees]) => {

            // place all roles in array
            for (i=0; i < roles.length; i++){
                roleArr.push(roles[i].title);
            }

            // place all empoyees in array
            for (i=0; i < employees.length; i++){
                employeeArr.push(employees[i].Employee);
                //console.log(value[i].name);
            }

            return Promise.all([roles, employees]);
        }).then(([roles, employees]) => {

            inquirer.prompt([
                {
                    // prompt user to select employee
                    name: "employee",
                    type: "list",
                    message: "Who would you like to edit?",
                    choices: employeeArr
                }, {
                    // Select role to update employee
                    name: "role",
                    type: "list",
                    message: "What is their new role?",
                    choices: roleArr
                },]).then((answer) => {

                let roleID;
                let employeeID;

                /// get ID of role selected
                for (i=0; i < roles.length; i++){
                    if (answer.role == roles[i].title){
                        roleID = roles[i].id;
                    }
                }

                // get ID of employee selected
                for (i=0; i < employees.length; i++){
                    if (answer.employee == employees[i].Employee){
                        employeeID = employees[i].id;
                    }
                }

                // update employee with new role
                connection.query(`UPDATE employee SET role_id = ${roleID} WHERE id = ${employeeID}`, (err, res) => {
                    if(err) return err;

                    // confirm update employee
                    console.log(`\n ${answer.employee} ROLE UPDATED TO ${answer.role}...\n `);

                    // back to main menu
                    mainMenu();
                });
            });
        });

    }

    function updateEmpMngr() {

        // set global array for employees
        let employeeArr = [];

        connection.query("SELECT employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS Employee FROM employee ORDER BY Employee ASC", function (err, employees) {
            // place employees in array
            for (i=0; i < employees.length; i++){
                employeeArr.push(employees[i].Employee);
            }

            inquirer.prompt([
                {
                    // prompt user to selected employee
                    name: "employee",
                    type: "list",
                    message: "Who would you like to edit?",
                    choices: employeeArr
                }, {
                    // prompt user to select new manager
                    name: "manager",
                    type: "list",
                    message: "Who is their new Manager?",
                    choices: employeeArr
                },]).then((answer) => {

                let employeeID;
                let managerID;

                // get ID of selected manager
                for (i=0; i < employees.length; i++){
                    if (answer.manager == employees[i].Employee){
                        managerID = employees[i].id;
                    }
                }

                // get ID of selected employee
                for (i=0; i < employees.length; i++){
                    if (answer.employee == employees[i].Employee){
                        employeeID = employees[i].id;
                    }
                }

                // update employee with manager ID
                connection.query(`UPDATE employee SET manager_id = ${managerID} WHERE id = ${employeeID}`, (err, res) => {
                    if(err) return err;

                    // confirm update employee
                    console.log(`\n ${answer.employee} MANAGER UPDATED TO ${answer.manager}...\n`);

                    // go back to main menu
                    mainMenu();
                });
            });
        });

    }

    function deleteEmployee() {

        // Create global employee array
        let employeeArr = [];

        connection.query("SELECT employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS employee FROM employee ORDER BY Employee ASC", function(err, res) {
            // Place all employees in array
            for (i = 0; i < res.length; i++) {
                employeeArr.push(res[i].employee);
            }

            inquirer.prompt([
                {
                    // prompt user of all employees
                    name: "employee",
                    type: "list",
                    message: "Who would you like to delete?",
                    choices: employeeArr
                }, {
                    // confirm delete of employee
                    name: "yesNo",
                    type: "list",
                    message: "Confirm deletion",
                    choices: ["NO", "YES"]
                }]).then((answer) => {

                if (answer.yesNo == "YES") {
                    let employeeID;

                    // if confirmed, get ID of employee selected
                    for (i = 0; i < res.length; i++) {
                        if (answer.employee == res[i].employee) {
                            employeeID = res[i].id;
                        }
                    }

                    // deleted selected employee
                    connection.query(`DELETE FROM employee WHERE id=${employeeID};`, (err, res) => {
                        if (err) return err;

                        // confirm deleted employee
                        console.log(`\n EMPLOYEE '${answer.employee}' DELETED...\n `);

                        // back to main menu
                        mainMenu();
                    });
                }
                else {

                    // if not confirmed, go back to main menu
                    console.log(`\n EMPLOYEE '${answer.employee}' NOT DELETED...\n `);

                    // back to main menu
                    mainMenu();
                }

            });
        })
    }

    function deleteRole() {

        // Create role array
        let roleArr = [];

        // query all roles
        connection.query("SELECT roles.id, title FROM roles", function (err, res) {
            // add all roles to array
            for (i = 0; i < res.length; i++) {
                roleArr.push(res[i].title);
            }

            inquirer.prompt([{
                // confirm to continue to select role to delete
                name: "continueDelete",
                type: "list",
                message: "*** WARNING *** Deleting role will delete all employees associated with the role. Do you want to continue?",
                choices: ["NO", "YES"]
            }]).then((answer) => {

                // if not, go to main menu
                if (answer.continueDelete === "NO") {
                    mainMenu();
                }

            }).then(() => {

                inquirer.prompt([{
                    // prompt user of of roles
                    name: "role",
                    type: "list",
                    message: "Which role would you like to delete?",
                    choices: roleArr
                }, {
                    // confirm to delete role by typing role exactly
                    name: "confirmDelete",
                    type: "Input",
                    message: "Type the role title EXACTLY to confirm deletion of the role"

                }]).then((answer) => {

                    if (answer.confirmDelete === answer.role) {

                        // get role id of of selected role
                        let roleID;
                        for (i=0; i < res.length; i++){
                            if (answer.role == res[i].title){
                                roleID = res[i].id;
                            }
                        }

                        // delete role
                        connection.query(`DELETE FROM roles WHERE id=${roleID};`, (err, res) => {
                            if(err) return err;

                            // confirm role has been added
                            console.log(`\n ROLE '${answer.role}' DELETED...\n `);

                            //back to main menu
                            mainMenu();
                        });
                    }
                    else {

                        // if not confirmed, do not delete
                        console.log(`\n ROLE '${answer.role}' NOT DELETED...\n `);

                        //back to main menu
                        mainMenu();
                    }
                });
            })
        });
    }

    function deleteDepartment() {

        // department array
        let deptArr = [];

        connection.query("SELECT id, department_name FROM departments", function (err, depts) {
            // add all departments to array
            for (i=0; i < depts.length; i++){
                deptArr.push(depts[i].department_name);
            }

            inquirer.prompt([{

                // confirm to continue to select department to delete
                name: "continueDelete",
                type: "list",
                message: "*** WARNING *** Deleting a department will delete all roles and employees associated with the department. Do you want to continue?",
                choices: ["NO", "YES"]
            }]).then((answer) => {

                // if not, go back to main menu
                if (answer.continueDelete === "NO") {
                    mainMenu();
                }

            }).then(() => {

                inquirer.prompt([{

                    // prompt user to select department
                    name: "dept",
                    type: "list",
                    message: "Which department would you like to delete?",
                    choices: deptArr
                }, {

                    // confirm with user to delete
                    name: "confirmDelete",
                    type: "Input",
                    message: "Type the department name EXACTLY to confirm deletion of the department: "

                }]).then((answer) => {

                    if (answer.confirmDelete === answer.dept){

                        // if confirmed, get department id
                        let deptID;
                        for (i=0; i < depts.length; i++){
                            if (answer.dept == depts[i].department_name){
                                deptID = depts[i].id;
                            }
                        }

                        // delete department
                        connection.query(`DELETE FROM departments WHERE id=${deptID};`, (err, res) => {
                            if(err) return err;

                            // confirm department has been deleted
                            console.log(`\n DEPARTMENT '${answer.dept}' DELETED...\n `);

                            // back to main menu
                            mainMenu();
                        });
                    }
                    else {

                        // do not delete department if not confirmed and go back to main menu
                        console.log(`\n DEPARTMENT '${answer.dept}' NOT DELETED...\n `);

                        //back to main menu
                        mainMenu();
                    }

                });
            })
        });
    }
}