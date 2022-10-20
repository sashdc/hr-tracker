-- delete exisitng database and set up a new one to have clean working surface
DROP DATABASE IF EXISTS staff_db;
CREATE DATABASE staff_db;

USE staff_db;
-- create the department table
CREATE TABLE department(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- create the role table and link keys to the dept table
CREATE TABLE role(
    id INT AUTO_INCREMENT  PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

-- create the employee table and link keys to the role table as well as to itself
CREATE TABLE employee(
    id INT AUTO_INCREMENT  PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    manager_id INT NULL,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);