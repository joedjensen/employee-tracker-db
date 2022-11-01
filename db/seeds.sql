INSERT INTO departments (department_name)
VALUES ("Accounting"),
       ("Sales"),
       ('Engineering'),
       ("Product"),
       ("IT");

INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 125000.00, 1),
       ("Sales person", 85000.00, 2),
       ("Engineer", 150000.00, 3),
       ("PM", 175000, 4),
       ("Printer Guy", 45000.00, 5);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ("Jerry", "Chenette", 1, NULL),
       ("Manny","Nunes", 2, 1),
       ("Monica","Holboke", 4, NULL),
       ("Joe","Jensen", 3, 3),
       ("Jacob", "Cloaca", 5, 3);