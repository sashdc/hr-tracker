-- get list of departments
SELECT id AS ID, name AS "Department" 
FROM department;

-- WHEN I choose to view all roles
-- THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role 
SELECT
    role.id as "Role ID",
    title as "Job Title",
    salary as "Salary",
    department.name AS "Department"
    FROM role
    JOIN department ON role.department_id = department.id;
   
-- WHEN I choose to view all employees
-- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

SELECT
    a.id as "ID",
    concat(a.first_name, " ", a.last_name) AS "Name",
    role.title AS "Job Title",
    department.name AS "Department",
    role.salary AS "Salary",
    concat(b.first_name, " ", b.last_name) AS "Manager"
    FROM employee as a
    LEFT JOIN employee as b ON a.manager_id = b.id
     JOIN role ON role.id=a.role_id
     JOIN department ON role.department_id = department.id;

--  WHEN I choose to add a department
-- THEN I am prompted to enter the name of the department and that department is added to the database

INSERT into department(name)
VALUES("");

-- WHEN I choose to add a role
-- THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
INSERT into role(title, salary, department_id)
VALUES("", "", "");

-- WHEN I choose to add an employee
-- THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
INSERT into role(first_name, last_name, manager_id)
VALUES("", "", "");

-- WHEN I choose to update an employee role
-- THEN I am prompted to select an employee to update and their new role and this information is updated in the database
UPDATE employee
SET role_id = ?
WHERE id = ?

-- View budget for department
select sum(salary) from role where department_id = ?;