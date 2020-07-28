USE all_employees;
INSERT INTO departments (id, department_name)
VALUES(001, "Management");
INSERT INTO departments (id, department_name)
VALUES(002, "Marketing");
INSERT INTO departments (id, department_name)
VALUES(003, "Engineering");
INSERT INTO departments (id, department_name)
VALUES(004, "Finance");
INSERT INTO departments (id, department_name)
VALUES(005, "Sales");
INSERT INTO departments (id, department_name)
VALUES(006, "HR");

INSERT INTO roles (id, title, salary, department_id)
VALUES(10, "Operations Manager", 100.50, 001);
INSERT INTO roles (id, title, salary, department_id)
VALUES(11, "Office Manager", 100.50, 001);
INSERT INTO roles (id, title, salary, department_id)
VALUES(12, "CEO", 3000000.50, 001);

INSERT INTO roles (id, title, salary, department_id)
VALUES(20, "Marketing Manager", 10.50, 002);
INSERT INTO roles (id, title, salary, department_id)
VALUES(21, "Marketing Assistant", 10.10, 002);

INSERT INTO roles (id, title, salary, department_id)
VALUES(30, "Engineering Manager", 200.00, 003);
INSERT INTO roles (id, title, salary, department_id)
VALUES(15, "Software Engineering Lead", 168.00, 003);
INSERT INTO roles (id, title, salary, department_id)
VALUES(31, "Senior Engineer", 90.50, 003);
INSERT INTO roles (id, title, salary, department_id)
VALUES(32, "Junior Engineer", 80.50, 003);

INSERT INTO roles (id, title, salary, department_id)
VALUES(40, "Finance Manager", 60.08, 004);
INSERT INTO roles (id, title, salary, department_id)
VALUES(41, "Accountant", 58.06, 004);

INSERT INTO roles (id, title, salary, department_id)
VALUES(50, "Sales Manager", 5.05, 005);
INSERT INTO roles (id, title, salary, department_id)
VALUES(51, "Sales Assistant", 2.50, 005);
INSERT INTO roles (id, title, salary, department_id)
VALUES(52, "Sales Associate", 1.00, 005);

INSERT INTO roles (id, title, salary, department_id)
VALUES(60, "HR Manager", 20.08, 006);
INSERT INTO roles (id, title, salary, department_id)
VALUES(61, "HR Rep", 18.69, 006);


INSERT INTO employee (id, first_name, last_name, role_id)
VALUES(1001, "Isabelle", "A", 10);
INSERT INTO employee (id, first_name, last_name, role_id)
VALUES(1002, "Izzy", "G", 11);
INSERT INTO employee (id, first_name, last_name, role_id)
VALUES(1003, "Bella", "H", 12);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES(2001, "William", "B", 20);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(2002, "Will", "I", 21, 2001);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(2003, "Billy", "J", 21, 2001);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(2004, "Liam", "K", 21, 2001);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES(3001, "Genevieve", "C", 30);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(3002, "Jen", "L", 31, 3001);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(3003, "Gene", "M", 32, 3001);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(3004, "Ginny", "N", 33, 3001);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(3005, "Viv", "O", 33, 3001);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(3006, "Eve", "P", 33, 3001);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES(4001, "Alfred", "D", 40);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(4002, "Al", "Q", 41, 4001);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(4003, "Fred", "R", 41, 4001);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES(5001, "Margaret", "E", 50);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(5002, "Meg", "S", 51, 5001);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(5003, "Maggie", "T", 52, 5001);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(5004, "Marge", "U", 52, 5001);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES(6001, "Alexandra", "F", 60);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(6002, "Al", "U", 61, 6001);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(6003, "Lexi", "V", 61, 6001);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(6004, "Xander", "W", 61, 6001);
