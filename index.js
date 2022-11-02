const inquirer = require('inquirer')
// get helper functions that generate the submenus
const {getRoleSubMenu} = require('./helpers/roleHelpers')
const {getDepartmentSubMenu} = require('./helpers/departmentHelpers')
const {getEmployeeSubMenu} = require('./helpers/employeeHelpers')

console.log(`
███████╗███╗░░░███╗██████╗░██╗░░░░░░█████╗░██╗░░░██╗███████╗███████╗
██╔════╝████╗░████║██╔══██╗██║░░░░░██╔══██╗╚██╗░██╔╝██╔════╝██╔════╝
█████╗░░██╔████╔██║██████╔╝██║░░░░░██║░░██║░╚████╔╝░█████╗░░█████╗░░
██╔══╝░░██║╚██╔╝██║██╔═══╝░██║░░░░░██║░░██║░░╚██╔╝░░██╔══╝░░██╔══╝░░
███████╗██║░╚═╝░██║██║░░░░░███████╗╚█████╔╝░░░██║░░░███████╗███████╗
╚══════╝╚═╝░░░░░╚═╝╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚══════╝╚══════╝

    ███╗░░░███╗░█████╗░███╗░░██╗░█████╗░░██████╗░███████╗██████╗░
    ████╗░████║██╔══██╗████╗░██║██╔══██╗██╔════╝░██╔════╝██╔══██╗
    ██╔████╔██║███████║██╔██╗██║███████║██║░░██╗░█████╗░░██████╔╝
    ██║╚██╔╝██║██╔══██║██║╚████║██╔══██║██║░░╚██╗██╔══╝░░██╔══██╗
    ██║░╚═╝░██║██║░░██║██║░╚███║██║░░██║╚██████╔╝███████╗██║░░██║
    ╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝╚═╝░░╚═╝░╚═════╝░╚══════╝╚═╝░░╚═╝
`)

// our main function simply generates the main menu.
async function mainMenu() {
    // object destructuring to the get the user selectioni
    const { getSubMenu } = await inquirer.prompt([{
        name: "getSubMenu",
        message: "Select entity type:",
        type: "list",
        // function references are stored in the choice values so they are executable after user selection
        choices: [
            {
                name: "Departments",
                value: getDepartmentSubMenu
            },
            {
                name:"Roles",
                value: getRoleSubMenu
            },
            {
                name:"Employees",
                value: getEmployeeSubMenu
            },
            {
                name:"Quit",
                value: process.exit
            }
        ]
    }])
    // execute function reference associated with user selection
    const outcome = await getSubMenu();
    // after that function completes, regenerate the main menu
    mainMenu()
}
mainMenu()