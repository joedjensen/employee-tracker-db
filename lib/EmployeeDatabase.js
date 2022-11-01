const mysql = require('mysql2');
class EmployeeDatabase {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            // MySQL username,
            user: 'root',
            // MySQL password
            password: '',
            database: 'employees_db'
          }, console.log(`Connected to the database.`)).promise()
        }

    async getDepartments() {
        var rows = await this.connection.query(`SELECT id, department_name  FROM DEPARTMENTS`)
        return rows[0]
    }

    async getRoles() {
        var rows = await this.connection.query(`SELECT title, roles.id, department_name, salary, department_name  FROM roles LEFT JOIN departments on roles.department_id = departments.id`)
        return rows[0]
    }

    async getEmployees() {
        var rows = await this.connection.query(
            `SELECT employees.id, 
            employees.first_name, employees.last_name, 
            title, 
            department_name, 
            salary, 
            managers.first_name as manager_first_name, 
            managers.last_name as manager_last_name 
            FROM employees 
            LEFT JOIN roles on employees.role_id = roles.id
            LEFT JOIN departments on roles.department_id = departments.id
            LEFT JOIN employees as managers on employees.manager_id = managers.id
        `)
        return rows[0]
    }
    async addDepartment(department){
        const rows = await this.connection.query(`INSERT INTO departments (department_name) VALUES (?)`, [department])
        console.log(`Successfully added ${department} to departments`)

    }

    async addRole(title, salary, department_id){
        const rows = await this.connection.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [title, salary, department_id])
        console.log(`Successfully added ${title} to roles`)
    }

    async addEmployee(first_name, last_name, role_id, manager_id) {
        const rows = await this.connection.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, [first_name, last_name, role_id, manager_id])
        console.log(`Successfully added ${first_name} ${last_name} to employees`)
    }
    
    async updateEmployeeRole(employee_id, role_id) {
        const rows = await this.connection.query('UPDATE employees set role_id = ? where id = ?', [role_id, employee_id])
        console.log(`Successfully updated role`)
    }

    async updateEmployeeManager(employee_id, manager_id) {
        const rows = await this.connection.query('UPDATE employees set manager_id = ? where id = ?', [manager_id, employee_id])
        console.log(`Successfully updated manager`)
    }
}

module.exports = EmployeeDatabase