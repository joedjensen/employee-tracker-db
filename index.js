const inquirer = require('inquirer')
const Question = require('./lib/Question')
const EmployeeDatabase = require('./lib/EmployeeDatabase')
const cTable = require('console.table')


const employees_db = new EmployeeDatabase()

async function viewDepartments() {
    var res = await employees_db.getDepartments();
    console.table(res)
    mainMenu()
}

async function viewRoles() {
    var res = await employees_db.getRoles()
    console.table(res)
    mainMenu()
}

async function viewEmployees() {
    var res = await employees_db.getEmployees()
    console.table(res)
    mainMenu()
}
async function addDepartment() {
    const { department } = await inquirer.prompt([
        {
            name: "department",
            message: "What is the department name?",
            type: "input",
        }])
    var res = await employees_db.addDepartment(department)
    mainMenu()
}

async function addRole() {
    const res = employees_db.selectRoles()
    inquirer.prompt([
        {
            name: "title",
            message: "What is the title of the new role?"
        },
        {
            name: "salary",
            message: "What is the salary for the new role?"
        },
        {
            name: "department"
        }
    ])
}
mainMenuQuestionArray = [
    new Question("View All Departments", viewDepartments),
    new Question("Add a Department", addDepartment),
    new Question("View All Roles", viewRoles),
    new Question("Add a Role", addRole),
    new Question("View All Employees", viewEmployees),
    new Question("Add Employee"),
    new Question("Update Employee Role"),
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
    const { whatToDo } = await inquirer.prompt([{
        name: "whatToDo",
        message: "What would you like to do?",
        type: "list",
        choices: mainMenuQuestionArray.map(question => question.text)
    }])

    const selectedQuestion = mainMenuQuestionArray.filter(question => question.text === whatToDo)[0]
    if (whatToDo === "Quit") {
        process.exit();
    } else if (!selectedQuestion.action) {
        console.log("no action specified")
        process.exit()
    }
    const outcome = await selectedQuestion.action();
}
mainMenu()