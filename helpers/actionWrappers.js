const inquirer = require('inquirer');
const EmployeeDatabase = require('../lib/EmployeeDatabase');

const employees_db = new EmployeeDatabase();

async function viewDepartments() {
    var res = await employees_db.getDepartments();
    console.table(res);
}
exports.viewDepartments = viewDepartments;

async function viewRoles() {
    var res = await employees_db.getRoles();
    console.table(res);
}
exports.viewRoles = viewRoles;

async function viewEmployees() {
    var res = await employees_db.getEmployees();
    console.table(res);
}
exports.viewEmployees = viewEmployees;
async function addDepartment() {
    const { department } = await inquirer.prompt([
        {
            name: "department",
            message: "What is the department name?",
            type: "input",
        }
    ]);
    var res = await employees_db.addDepartment(department);
}
exports.addDepartment = addDepartment;

async function addRole() {
    const deptObjsArray = await employees_db.getDepartments();
    const deptNamesArray = deptObjsArray.map(deptObj => ({"name" :deptObj.department_name, "value": deptObj.id}));
    const { title, salary, department } = await inquirer.prompt([
        {
            name: "title",
            message: "What is the title of the new role?"
        },
        {
            name: "salary",
            message: "What is the salary for the new role?"
        },
        {
            name: "department",
            message: "What department is this role in?",
            type: "list",
            choices: deptNamesArray
        }
    ]);
    const output = await employees_db.addRole(title, salary, department);
}
exports.addRole = addRole;

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
exports.updateRole = updateRole;

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
exports.updateManager = updateManager;

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
exports.viewEmployeesByManager = viewEmployeesByManager

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
exports.viewEmployeesByDepartment = viewEmployeesByDepartment;
