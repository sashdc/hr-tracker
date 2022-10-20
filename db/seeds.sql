INSERT INTO department (name)
VALUES ("Sales"),
       ("Legal"),
       ("Engineering"),
       ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 97000, 1),
       ("Salesperson", 65000, 1),
       ("Legal Team Lead", 187000, 2),
       ("Lawyer", 135000, 2),
       ("Lead Engineer", 183000, 3),
       ("Software Engineer", 144000, 3),
       ("Account Manager", 177000, 4),
       ("Accountant", 140000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Eleanor", "Rigby", 1, NULL),
       ("Johnny", "Mackenzie", 2, 1),
       ("Alicia", "Kent", 3, NULL),
       ("Otto", "Grunthall", 4, 3),
       ("Barry", "Lightfoot", 5, NULL),
       ("Moe", "Salah", 6, 5),
       ("Stenny", "Coen", 7, NULL),
       ("Ebenezer", "Schuyler", 8, 7);