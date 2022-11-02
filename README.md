# Employee Tracker Database
This repository contains a command line application which enables users to read from and write to a database containing information about employees. Users are able to create, read and delete departments and roles, and create, read, update and delete employees. Data follows the schema below

This repository utilizes
* JavaScript
* Node
* npm
* Inquirer
* mysql
* mysql2

[Video](https://drive.google.com/file/d/18mSormtuH-03CSAH497sysamsupmQeoH/view)

## Installation 

Make sure you have node installed. Install dependencies
```sh
npm install
```
You will need mysql installed, and will want to update the connection in EmployeeDatabase to reflect your username and password. You can generate and seed the database by running 
```sh
source db/schema.sql
source db/seeds.sql
```
from with the mysql shell at the root directory

## Usage 

```sh
node index.js
```
And then navigate through the menu.

## Code Snippets
One interesting bit od code is the query used to generate the budget summary for a given department. All 3 tables are joined in order to generate the summary.
```Javascript
async summarizeDeptBudget(department_id) {
    const row = await this.connection.query(`SELECT department_name, SUM(salary) as total_budget
                                             FROM 
                                             departments 
                                             JOIN roles on departments.id = roles.department_id
                                             JOIN employees on roles.id = employees.role_id
                                             where departments.id = ? 
                                             group by departments.id`, [department_id])
    return row[0]
}
```
Another cute pattern is the use of function references in inquirer choices. This pattern provides a concise way to take action on a user selection.
```Javascript
async function getDepartmentSubMenu() {
    const { action } = await inquirer.prompt([
        {
            name: "action",
            message: "Select action:",
            type: "list",
            choices: [
                { name: "View all Departments", value: viewDepartments },
                { name: "Add a Department", value: addDepartment },
                { name: "Delete a Department", value: deleteDepartment },
                { name: "View Budget for Department", value: viewDepartmentBudget }]
        }
    ]);
    var res = await action();
}
```
The last highlight is the use of `async await` to enable dynamic choice generation in inquirer prompts. In this example, after the user selects the employee whose manager they wish to update, we remove that employee from the potential choices for the new manager. After all, arent we all our own managers. 
```Javascript
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
            choices: employeeNamesArray.filter(employeeObj => employeeObj.value != employee)
        }
    ])
    const output = await employees_db.updateEmployeeManager(employee, manager);
}
```

## License

Refer to the license in the Github repo.
