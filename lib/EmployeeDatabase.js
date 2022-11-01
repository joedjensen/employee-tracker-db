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

    viewAll(table) {
        this.connection.query(`SELECT * FROM ${table}`, function(err, res) {
            if (err) throw err;
            console.log(res);
          });
    }

    viewDepartments() {
        return this.viewAll('departments')
    }
    viewRoles() {
        this.viewAll("ROLES")
    }
    viewEmployees() {
        this.viewAll("employees")
    }
}

module.exports = EmployeeDatabase