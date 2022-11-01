const inquirer = require('inquirer');
const employees_db = require('../lib/EmployeeDatabase')
const cTable = require('console.table')

async function getDepartmentSubMenu() {
    const { action } = await inquirer.prompt([
        {
            name: "action",
            message: "Select action:",
            type: "list",
            choices: [{name:"View all Departments", value: viewDepartments}, {name:"Add a Department", value: addDepartment}, {name:"Delete a Department", value: deleteDepartment}, {name:"View Budget for Department", value: viewDepartmentBudget}]
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

async function deleteDepartment() {
    const departmentObjsArray = await employees_db.getDepartments();
    const departmentNamesArray = departmentObjsArray.map(departmentObj => ({ "name": `${departmentObj.department_name}`, "value": departmentObj.id }));
    const { department } = await inquirer.prompt([
        {
            name: "department",
            message: "Which department would you like to delete?",
            type: "list",
            choices: departmentNamesArray
        }
    ]);
    const output = await employees_db.deleteEntity('departments', department);
}

async function viewDepartmentBudget() {
    const departmentObjsArray = await employees_db.getDepartments();
    const departmentNamesArray = departmentObjsArray.map(departmentObj => ({ "name": `${departmentObj.department_name}`, "value": departmentObj.id }));
    const { department } = await inquirer.prompt([
        {
            name: "department",
            message: "Which department would you like to view the budget for?",
            type: "list",
            choices: departmentNamesArray
        }
    ]);
    const output = await employees_db.summarizeDeptBudget(department);
    console.table(output)

}
