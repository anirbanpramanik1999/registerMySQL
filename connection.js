let mysql=require('mysql2')
let conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"system",
    database:"login_april"
})

module.exports=conn;