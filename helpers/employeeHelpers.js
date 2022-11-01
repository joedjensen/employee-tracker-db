const inquirer = require('inquirer');
const employees_db = require('../lib/EmployeeDatabase')
const cTable = require('console.table')

async function getEmployeeSubMenu() {
    const { action } = await inquirer.prompt([
        {
            name: "action",
            message: "Select action:",
            type: "list",
            choices: [{name:"View Employees", value: viewEmployees}, {name:"Add an Employee", value: addEmployee}, {name:"Update an Employee", value: updateEmployee}]
        }
    ]);
    var res = await action();
}
exports.getEmployeeSubMenu = getEmployeeSubMenu

async function viewEmployees() {
    const { by } = await inquirer.prompt([
        {
            name: "by",
            message: "Filter Employees by?",
            type: "list",
            choices: [{name:"All", value: viewAllEmployees}, {name:"Manager", value: viewEmployeesByManager}, {name:"Department", value: viewEmployeesByDepartment}]
        }
    ]);
    var res = await by();
    console.table(res);
}
exports.viewEmployees = viewEmployees;

async function viewAllEmployees() {
    const res = await employees_db.getEmployees()
    console.table(res)
}

async function viewEmployeesByManager() {
    const managersObjArray = await employees_db.getUniqueManagers();
    const managersNamesArray = managersObjArray.map(managerObj => ({
        "name": `${managerObj.first_name} ${managerObj.last_name}`, "value": managerObj.id
    }));
    const { manager }  = await inquirer.prompt([{
        name : 'manager',
        message: "Which manager which you like to view employees for?",
        type: "list",
        choices: managersNamesArray
    }])
    const output = await employees_db.getEmployeesByManager(manager)
    console.table(output)
}

async function viewEmployeesByDepartment() {
    const deptObjArray = await employees_db.getDepartments();
    const deptNamesArray = deptObjArray.map(deptObj => ({
        "name": `${deptObj.department_name}`, "value": deptObj.id
    }));
    const { department }  = await inquirer.prompt([{
        name : 'department',
        message: "Which department which you like to view employees for?",
        type: "list",
        choices: deptNamesArray
    }])
    const output = await employees_db.getEmployeesByDepartment(department)
    console.table(output)
}


async function addEmployee() {
    const rolesObjArray = await employees_db.getRoles();
    const rolesNameArray = rolesObjArray.map(rolesObj => ({ "name": rolesObj.title, "value": rolesObj.id }));
    const managerObjsArray = await employees_db.getEmployees();
    const managersNamesArray = managerObjsArray.map(managerObj => ({
        "name": `${managerObj.first_name} ${managerObj.last_name}`, "value": managerObj.id
    }));
    const { first_name, last_name, role, manager } = await inquirer.prompt([
        {
            name: "first_name",
            message: "What is the employees first name?"
        },
        {
            name: "last_name",
            message: "What is the employees last name?"
        },
        {
            name: "role",
            message: "What is the employees role?",
            type: "list",
            choices: rolesNameArray
        },
        {
            name: "manager",
            message: "Who is this employees manager?",
            type: "list",
            choices: managersNamesArray
        }
    ]);
    const output = await employees_db.addEmployee(first_name, last_name, role, manager);
}
exports.addEmployee = addEmployee;

async function updateEmployee() {
    const { action } = await inquirer.prompt([
        {
            name: "action",
            message: "Update employees:",
            type: "list",
            choices: [{name:"Role", value: updateRole}, {name:"Manager", value: updateManager}]
        }
    ])
    const rows = await action();
}
exports.updateEmployee = updateEmployee;



async function updateRole() {
    const employeeObjsArray = await employees_db.getEmployees();
    const employeeNamesArray = employeeObjsArray.map(employeeObj => ({
        "name": `${employeeObj.first_name} ${employeeObj.last_name}`, "value": employeeObj.id
    }));
    const rolesObjArray = await employees_db.getRoles();
    const rolesNameArray = rolesObjArray.map(rolesObj => ({ "name": rolesObj.title, "value": rolesObj.id }));
    const { employee, role } = await inquirer.prompt([
        {
            name: "employee",
            message: "What employee do you want to update?",
            type: 'list',
            choices: employeeNamesArray
        },
        {
            name: "role",
            message: "What is the employees new role?",
            type: "list",
            choices: rolesNameArray
        }
    ]);
    const output = await employees_db.updateEmployeeRole(employee, role);
}

async function updateManager() {
    const employeeObjsArray = await employees_db.getEmployees();
    const employeeNamesArray = employeeObjsArray.map(employeeObj => ({
        "name": `${employeeObj.first_name} ${employeeObj.last_name}`, "value": employeeObj.id
    }));
    const { employee, manager } = await inquirer.prompt([
        {
            name: "employee",
            message: "What employee do you want to update?",
            type: 'list',
            choices: employeeNamesArray
        },
        {
            name: "manager",
            message: "Who is the employees new manager?",
            type: "list",
            choices: employeeNamesArray
        }
    ]);
    const output = await employees_db.updateEmployeeManager(employee, manager);
}


