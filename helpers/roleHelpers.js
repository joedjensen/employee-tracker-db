const inquirer = require('inquirer');
const employees_db = require('../lib/EmployeeDatabase')
const cTable = require('console.table')

async function getRoleSubMenu() {
    const { action } = await inquirer.prompt([
        {
            name: "action",
            message: "Select action:",
            type: "list",
            choices: [{name:"View all Roles", value: viewRoles}, {name:"Add a Role", value: addRole}, {name:"Delete a Role", value: deleteRole}]
        }
    ]);
    var res = await action();
}
exports.getRoleSubMenu = getRoleSubMenu

async function viewRoles() {
    var res = await employees_db.getRoles();
    console.table(res);
}
exports.viewRoles = viewRoles;

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
            message: "What is the salary for the new role?",
            type:'number'
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

async function deleteRole() {
        const roleObjsArray = await employees_db.getRoles();
        const rolesNameArray = roleObjsArray.map(roleObj => ({"name" :roleObj.title, "value": roleObj.id}));
        const { role } = await inquirer.prompt([
            {
                name: "role",
                message: "Which role would you like to delete?",
                type: "list",
                choices: rolesNameArray
            }
        ]);
        const output = await employees_db.deleteEntity('roles', role);
}
