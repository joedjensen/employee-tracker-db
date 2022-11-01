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
          }, console.log(`Connected to the database.`))
    }

    getAll(table) {
        this.connection.promise().query(`SELECT * FROM ${table}`, function(err, res) {
            if (err) throw err;
            return res;
          });
    }

    async getDepartments() {
        var rows = await this.connection.promise().query(`SELECT id, department_name  FROM DEPARTMENTS`)
        return rows[0]
    }

    async getRoles() {
        var rows = await this.connection.promise().query(`SELECT title, roles.id, department_name, salary, department_name  FROM roles LEFT JOIN departments on roles.department_id = departments.id`)
        return rows[0]
    }
    getEmployees() {
        this.getAll("employees")
    }
    addDepartment(department){
        this.connection.query(`INSERT INTO departments (department_name)
        VALUES (?)`, [department], function(err, res) {
            if (err) throw err;
            console.log(`Succeessfully added ${department}`)
          });
    }
}

module.exports = EmployeeDatabase