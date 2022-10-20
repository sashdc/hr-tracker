const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const { exit } = require('process');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'zozzy',
      database: 'staff_db'
    },
    console.log(`
██╗  ██╗██████╗     ████████╗██████╗  █████╗  ██████╗██╗  ██╗███████╗██████╗ 
██║  ██║██╔══██╗    ╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
███████║██████╔╝       ██║   ██████╔╝███████║██║     █████╔╝ █████╗  ██████╔╝
██╔══██║██╔══██╗       ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗
██║  ██║██║  ██║       ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║
╚═╝  ╚═╝╚═╝  ╚═╝       ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
                                                                             `)
  );

const openingQuest =[ 
    {
        type: 'list',
        message: "What would you like to do?",
        choices: ['View all departments', 'View all roles', 'View all employees','Add a department', 'Add a role','Add an employee', 'Update an employee role','Quit'],
        name: 'starting'
      }
]

const newdDept = [
    {
      type: 'input',
      message: "Please enter the Department name",
      name: 'deptname',
    }
]


const newEmp = [
        {
          type: 'input',
          message: "Please enter the Employee's first Name.",
          name: 'firstname',
        },
        {
            type: 'input',
            message: "Please enter the Employee's last Name.",
            name: 'lastname',
          },
          {
            type: 'input',
            message: "Please enter the Employee's Role ID.",
            name: 'role',
          },
          {
            type: 'input',
            message: "Please enter the Employee's Manager ID.",
            name: 'manager',
          }
        ]

function init(){
    inquirer.prompt (openingQuest)
    .then
  (function (answers){  
    choice = answers.starting    
    if (choice=== "View all departments"){
      viewDepts()}
    else if (choice==="View all roles"){
        viewRoles()
    }
    else if (choice==="View all employees"){
        viewEmp()
    }
    else if (choice==="Add a department"){
        addDept()
    }
    else if (choice==="Add a role"){
        addRole()
    }
    else if (choice==="Add an employee"){
        addEmp()
    }
    else if (choice==="Update an employee role"){
        updateRole()}
    else if (choice==="Quit"){
        exit()
    }
    })}

function viewDepts(){
        db.query(`SELECT id AS ID, name AS "Department" 
        FROM department;`, function (err, results) {
        console.table(results);});
    setTimeout(() => {init();}, 1000)
    }

function viewRoles(){
        db.query(`SELECT
        role.id as "Role ID",
        title as "Job Title",
        salary as "Salary",
        department.name AS "Department"
        FROM role
        JOIN department ON role.department_id = department.id;`, function (err, results) {
        console.table(results);});
    setTimeout(() => {init();}, 1000)
    }

function viewEmp(){
    db.query(`SELECT
    a.id as "ID",
    concat(a.first_name, " ", a.last_name) AS "Name",
    role.title AS "Job Title",
    department.name AS "Department",
    role.salary AS "Salary",
    concat(b.first_name, " ", b.last_name) AS "Manager"
    FROM employee as a
    LEFT JOIN employee as b ON a.manager_id = b.id
     JOIN role ON role.id=a.role_id
     JOIN department ON role.department_id = department.id;`, function (err, results) {
        console.table(results);});
    setTimeout(() => {init();}, 1000)
}

function addDept(){
    inquirer.prompt (newdDept)
    .then(answers => {
        db.query(`INSERT into department(name)
        VALUES("${answers.deptname}");`, function (err, results) {
            console.table(viewDepts());})
    })
}

function addRole(){
    db.query(`Select * from department;`, function(err, results){
        var deptList = results.map((department)=> ({
                name : department.name, 
                value : department.id
        }))

        inquirer.prompt ([
            {
                    type: 'input',
                    message: "Please enter new role title.",
                    name: 'newRole',
                  },
            {
                    type: 'input',
                    message: "Please enter new role salary.",
                    name: 'newRoleSalary',
                  },

                  {
                      type: 'list',
                      message: "Please select the new role’s department.",
                      choices : deptList,
                      name: 'newRoleDept',
                    }
        ])
        .then (answers => {
            db.query(`INSERT into role(title, salary, department_id)
            VALUES("${answers.newRole}","${answers.newRoleSalary}","${answers.newRoleDept}");`, function (err, results) {
            console.log("Succesfully Updated")
            console.table(viewRoles());})
        })
    } )
    }

function addEmp(){
    inquirer.prompt (newEmp)
    .then(answers => {
        db.query(`INSERT into employee(first_name, last_name, role_id, manager_id)
        VALUES("${answers.firstname}","${answers.lastname}","${answers.role}", "${answers.manager}");`, function (err, results) {
            console.log("Succesfully Updated")
            console.table(viewEmp());})
    })
}

function updateRole(){
    db.query(`Select * from employee;`, function(err, results){
        console.log(results)
        var empList = results.map((employee)=> ({
                name : employee.first_name + " " + employee.last_name,
                value : employee.id
        }))
    db.query(`Select * from role;`, function(err, results){
        var roleList = results.map((role)=>({
                name : role.title,
                value: role.id
        }))

        inquirer.prompt ([
            {
                    type: 'list',
                    message: "Please select Employee.",
                    choices : empList,
                    name: 'employee',
                  },
                  {
                      type: 'list',
                      message: "Please select the employee's new role ID.",
                      choices : roleList,
                      name: 'newrole',
                    }
        ])
        .then (answers => {
            db.query(`UPDATE employee
            SET role_id = ${answers.newrole}
            WHERE id = ${answers.employee};`, function (err, results){
                if (err){
                    throw err
                }
                console.log("Succesfully Updated")
                console.table(viewEmp())
            })
            console.log(answers)
        })
    } )
    })
}

init()