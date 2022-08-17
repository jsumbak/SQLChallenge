/* array for departments */
INSERT INTO department (names)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

/* array for roles */
INSERT INTO roles (title, department_id, salary)
VALUES ("Lawyer", 1, 200000), ("Lead Enginner", 2, 150000), ("Account Manager", 3, 160000), ("Salesperson",4, 80000), ("Sales Lead", 4, 100000);

-- /* array for employees */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kim", "Kardash", 1, 2), ("Khloe", "Kardash", 2, 1), ("Kris", "Jenner", 3, 3), ("North", "West", 4, 1 ), ("Lord", "Disick", 4, 1 );