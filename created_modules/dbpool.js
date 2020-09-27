const mysql = require('mysql2');



//creating connection to db
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "tables",
})


//connect to db
db.connect((err)=>{
    if(err){
        throw err;
    }else{
        console.log('MySql connected')
    }
})

module.exports = {
    'db' : db
}