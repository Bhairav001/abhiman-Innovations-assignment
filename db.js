const mysql = require("mysql2/promise");

const mysqlPool = mysql.createPool({
    host:"localhost",
    user:"roo",
    password:"Bhiarav@123",
    database:"polls_db"
})

mysqlPool.query("SELECT 1")
.then(data=>console.log(data))
.catch(err=>console.log("db connection failed. \n"+ err))