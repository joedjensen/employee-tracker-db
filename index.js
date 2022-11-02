const inquirer = require('inquirer')
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


async function mainMenu() {
    const { getSubMenu } = await inquirer.prompt([{
        name: "getSubMenu",
        message: "Select entity type:",
        type: "list",
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
    const outcome = await getSubMenu();
    mainMenu()
}
mainMenu()