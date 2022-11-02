const inquirer = require('inquirer');
const employees_db = require('../lib/EmployeeDatabase')
const cTable = require('console.table')

// async submenu
// async because they bottom out in sql queries
async function getDepartmentSubMenu() {
    const { action } = await inquirer.prompt([
        {
            name: "action",
            message: "Select action:",
            type: "list",
            // function refs in values
            choices: [
                { name: "View all Departments", value: viewDepartments },
                { name: "Add a Department", value: addDepartment },
                { name: "Delete a Department", value: deleteDepartment },
                { name: "View Budget for Department", value: viewDepartmentBudget }]
        }
    ]);
    // execute selection
    var res = await action();
}
exports.getDepartmentSubMenu = getDepartmentSubMenu

async function viewDepartments() {
    var res = await employees_db.getDepartments();
    console.table(res);
}
exports.viewDepartments = viewDepartments;

async function addDepartment() {
    // add requires more input
    const { department } = await inquirer.prompt([
        {
            name: "department",
            message: "What is the department name?",
            type: "input",
            validate: validate
        }
    ]);
    var res = await employees_db.addDepartment(department);
}
exports.addDepartment = addDepartment;

async function deleteDepartment() {
    // get existing departments
    const departmentObjsArray = await employees_db.getDepartments();
    // map to array to use for choices. value id department id
    const departmentNamesArray = departmentObjsArray.map(departmentObj => ({ "name": `${departmentObj.department_name}`, "value": departmentObj.id }));
    const { department } = await inquirer.prompt([
        {
            name: "department",
            message: "Which department would you like to delete?",
            type: "list",
            choices: departmentNamesArray
        }
    ]);
    // delete department by id
    const output = await employees_db.deleteEntity('departments', department);
}

async function viewDepartmentBudget() {
    // get existing departments
    const departmentObjsArray = await employees_db.getDepartments();
    // map to array for choices. value is department id
    const departmentNamesArray = departmentObjsArray.map(departmentObj => ({ "name": `${departmentObj.department_name}`, "value": departmentObj.id }));
    const { department } = await inquirer.prompt([
        {
            name: "department",
            message: "Which department would you like to view the budget for?",
            type: "list",
            choices: departmentNamesArray
        }
    ]);
    // wait for query result and table
    const output = await employees_db.summarizeDeptBudget(department);
    console.table(output)

}

function validate(answer) {
    if (answer?.trim()) {
        return true
    } else {
        return 'Please enter something';
    }
}
