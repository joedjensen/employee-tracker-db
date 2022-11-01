const inquirer = require('inquirer')
const Question = require('./lib/Question')
const cTable = require('console.table')
const { viewDepartments, addDepartment, viewRoles, addRole, viewEmployees, addEmployee, updateRole, updateManager } = require("./helpers/actionWrappers")


mainMenuQuestionArray = [
    new Question("View All Departments", viewDepartments),
    new Question("Add a Department", addDepartment),
    new Question("View All Roles", viewRoles),
    new Question("Add a Role", addRole),
    new Question("View All Employees", viewEmployees),
    new Question("Add Employee", addEmployee),
    new Question("Update Employee Role", updateRole),
    new Question("Update Employee Manager", updateManager),
    new Question("Quit")
]

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
    const { index } = await inquirer.prompt([{
        name: "index",
        message: "What would you like to do?",
        type: "list",
        choices: mainMenuQuestionArray.map((question, index) => ({"name":question.text, "value": index}))
    }])
    const selectedQuestion = mainMenuQuestionArray[index]
    if (selectedQuestion.text === "Quit") {
        process.exit();
    } else if (!selectedQuestion.action) {
        console.log("no action specified")
        process.exit()
    }
    const outcome = await selectedQuestion.action();
    mainMenu()
}
mainMenu()