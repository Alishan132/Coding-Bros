require("dotenv").config()
const mysql = require("mysql")

const connection = mysql.createConnection({
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : "coding_bros",
    port : 3306
})

module.exports = connection