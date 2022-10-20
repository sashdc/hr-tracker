const cTable = require('console.table');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



