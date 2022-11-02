const inquirer = require('inquirer');
const employees_db = require('../lib/EmployeeDatabase')
const cTable = require('console.table')

// async submenu
// bottoms out in queries
async function getEmployeeSubMenu() {
    const { action } = await inquirer.prompt([
        {
            name: "action",
            message: "Select action:",
            type: "list",
            // function refs as values
            choices: [
                {
                    name: "View Employees",
                    value: viewEmployees
                },
                {
                    name: "Add an Employee",
                    value: addEmployee
                },
                {
                    name: "Update an Employee",
                    value: updateEmployee
                },
                {
                    name: "Delete an Employee",
                    value: deleteEmployee
                }
            ]
        }
    ]);
    // execute selection
    const res = await action();
}
exports.getEmployeeSubMenu = getEmployeeSubMenu

async function viewEmployees() {
    const { action } = await inquirer.prompt([
        {
            name: "action",
            message: "Filter Employees by?",
            type: "list",
            // function refs as values
            choices: [
                {
                    name: "All",
                    value: viewAllEmployees
                },
                {
                    name: "Manager",
                    value: viewEmployeesByManager
                },
                {
                    name: "Department",
                    value: viewEmployeesByDepartment
                }]
        }
    ]);
    // wait for query result and table
    const res = await action();
    console.table(res);
}
exports.viewEmployees = viewEmployees;

async function viewAllEmployees() {
    const res = await employees_db.getEmployees()
    console.table(res)
}

async function viewEmployeesByManager() {
    // get possible managers
    const managersObjArray = await employees_db.getUniqueManagers();
    // map to array for use in choices. value is manager id
    const managersNamesArray = managersObjArray.map(managerObj => ({
        "name": `${managerObj.first_name} ${managerObj.last_name}`, "value": managerObj.id
    }));
    const { manager } = await inquirer.prompt([{
        name: 'manager',
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
    const { department } = await inquirer.prompt([{
        name: 'department',
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
    // add option for no manager
    managersNamesArray.unshift({ "name": "None", "value": null })
    const { first_name, last_name, role, manager } = await inquirer.prompt([
        {
            name: "first_name",
            message: "What is the employees first name?",
            validate: validate
        },
        {
            name: "last_name",
            message: "What is the employees last name?",
            validate: validate
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
            choices: [{ name: "Role", value: updateRole }, { name: "Manager", value: updateManager }]
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
    const { employee } = await inquirer.prompt([
        {
            name: "employee",
            message: "What employee do you want to update?",
            type: 'list',
            choices: employeeNamesArray
        }])
    // get current title
    const { title } = employeeObjsArray.filter(obj => obj.id = employee)[0]
    const rolesObjArray = await employees_db.getRoles();
    // remove current title from options for update
    const rolesNameArray = rolesObjArray.filter(obj => obj.title != title).map(rolesObj => ({ "name": rolesObj.title, "value": rolesObj.id }));
    const { role } = await inquirer.prompt([
        {
            name: "role",
            message: "What is the employees new role?",
            type: "list",
            choices: rolesNameArray
        }
    ])
    const output = await employees_db.updateEmployeeRole(employee, role);
}

async function updateManager() {
    const employeeObjsArray = await employees_db.getEmployees();
    const employeeNamesArray = employeeObjsArray.map(employeeObj => ({
        "name": `${employeeObj.first_name} ${employeeObj.last_name}`, "value": employeeObj.id
    }));
    const { employee } = await inquirer.prompt([
        {
            name: "employee",
            message: "What employee do you want to update?",
            type: 'list',
            choices: employeeNamesArray
        },
    ]);
    employeeNamesArray.unshift({ "name": "None", "value": null })
    const { manager } = await inquirer.prompt([
        {
            name: "manager",
            message: "Who is the employees new manager?",
            type: "list",
            // remove self from list of possible managers
            choices: employeeNamesArray.filter(employeeObj => employeeObj.value != employee)
        }
    ])
    const output = await employees_db.updateEmployeeManager(employee, manager);
}

async function deleteEmployee() {
    const employeeObjsArray = await employees_db.getEmployees();
    const employeeNamesArray = employeeObjsArray.map(employeeObj => ({ "name": `${employeeObj.first_name} ${employeeObj.last_name}`, "value": employeeObj.id }));
    const { employee } = await inquirer.prompt([
        {
            name: "employee",
            message: "Which employee would you like to delete?",
            type: "list",
            choices: employeeNamesArray
        }
    ]);
    const output = await employees_db.deleteEntity('employees', employee);
}

function validate(answer) {
    if (answer?.trim()) {
        return true
    } else {
        return 'Please enter something';
    }
}
