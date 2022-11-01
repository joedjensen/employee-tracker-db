const inquirer = require('inquirer');
const employees_db = require('../lib/EmployeeDatabase')
const cTable = require('console.table')

async function getDepartmentSubMenu() {
    const { action } = await inquirer.prompt([
        {
            name: "action",
            message: "Select action:",
            type: "list",
            choices: [{name:"View all Departments", value: viewDepartments}, {name:"Add a Department", value: addDepartment}]
        }
    ]);
    var res = await action();
}
exports.getDepartmentSubMenu = getDepartmentSubMenu

async function viewDepartments() {
    var res = await employees_db.getDepartments();
    console.table(res);
}
exports.viewDepartments = viewDepartments;

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