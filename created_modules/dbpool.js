const mysql = require('mysql2');



//creating connection to db
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ReyPembert12",
    database: "charts_db",
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