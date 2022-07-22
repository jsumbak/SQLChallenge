INSERT INTO department (names, department_id)
VALUES ("Sales", "4"), ("Engineering", "8"), ("Finance", "6"), ("Legal", "10");

INSERT INTO roles (title, role_id, department_id, salary)
VALUES ("Lawyer", "1", "10", "200000"), ("Lead Enginner", "2", "8", "150000"), ("Account Manager", "3", "6", "160000"), ("Salesperson", "4", "4", "80000"), ("Sales Lead", "5", "4", "100000");

INSERT INTO employee (first_name, last_name, title, department_id, salary, manager_id)
VALUES ("Kim", "Kardash", "Lawyer", "Legal", "200000", "Null"), ("Khloe", "Kardash", "Lead Engineer", "Engineering", "150000", "Tristan"), ("Kris", "Jenner", "Account Manager", "Finance", "160000", "Kim"), ("North", "West", "Salesperson", "Sales", "80000", "Kanye"), ("Lord", "Disick", "Sales Lead", "Sales", "100000", "Kourt");