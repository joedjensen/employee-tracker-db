const inquirer = require('inquirer')
const {getRoleSubMenu} = require('./helpers/roleHelpers')
const {getDepartmentSubMenu} = require('./helpers/departmentHelpers')
const {getEmployeeSubMenu} = require('./helpers/employeeHelpers')

console.log(`
 /$$$$$$$$                         /$$                                              
| $$_____/                        | $$                                              
| $$       /$$$$$$/$$$$   /$$$$$$ | $$  /$$$$$$  /$$   /$$  /$$$$$$   /$$$$$$       
| $$$$$   | $$_  $$_  $$ /$$__  $$| $$ /$$__  $$| $$  | $$ /$$__  $$ /$$__  $$      
| $$__/   | $$ \ $$ \ $$| $$  \ $$| $$| $$  \ $$| $$  | $$| $$$$$$$$| $$$$$$$$      
| $$      | $$ | $$ | $$| $$  | $$| $$| $$  | $$| $$  | $$| $$_____/| $$_____/      
| $$$$$$$$| $$ | $$ | $$| $$$$$$$/| $$|  $$$$$$/|  $$$$$$$|  $$$$$$$|  $$$$$$$      
|________/|__/ |__/ |__/| $$____/ |__/ \______/  \____  $$ \_______/ \_______/      
                        | $$                     /$$  | $$                          
                        | $$                    |  $$$$$$/                          
                        |__/                     \______/                           
 /$$      /$$                                                                       
| $$$    /$$$                                                                       
| $$$$  /$$$$  /$$$$$$  /$$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$            
| $$ $$/$$ $$ |____  $$| $$__  $$ |____  $$ /$$__  $$ /$$__  $$ /$$__  $$           
| $$  $$$| $$  /$$$$$$$| $$  \ $$  /$$$$$$$| $$  \ $$| $$$$$$$$| $$  \__/           
| $$\  $ | $$ /$$__  $$| $$  | $$ /$$__  $$| $$  | $$| $$_____/| $$                 
| $$ \/  | $$|  $$$$$$$| $$  | $$|  $$$$$$$|  $$$$$$$|  $$$$$$$| $$                 
|__/     |__/ \_______/|__/  |__/ \_______/ \____  $$ \_______/|__/                 
                                            /$$  \ $$                               
                                           |  $$$$$$/                               
                                            \______/         
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
            }
        ]
    }])
    const outcome = await getSubMenu();
    mainMenu()
}
mainMenu()