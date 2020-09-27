const express = require('express');
const app = express();

//cors
const cors = require('cors');
app.use(cors());

const dbpool = require('./created_modules/dbpool');
const db = dbpool['db'];

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.static(__dirname + '/black-dashboard-master/assets'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/black-dashboard-master/examples/dashboard.html');
})


app.get('/location',(req,res)=>{

    sql=`select DISTINCT Location from data`;
    db.query(sql,(err,result)=>{
        if(err)throw err;
        res.json(result);
    })

})


app.get('/factory',(req,res)=>{

    sql=`select DISTINCT Factory from data`;
    db.query(sql,(err,result)=>{
        if(err)throw err;
        res.json(result);
    })

})


app.get('/region',(req,res)=>{

    sql=`select DISTINCT Region from data`;
    db.query(sql,(err,result)=>{
        if(err)throw err;
        res.json(result);
    })

})


app.get('/item',(req,res)=>{

    sql=`select DISTINCT ItemID from data`;
    db.query(sql,(err,result)=>{
        if(err)throw err;
        res.json(result);
    })

})


app.get('/salesperson',(req,res)=>{

    sql=`select DISTINCT SalesPerson from data`;
    db.query(sql,(err,result)=>{
        if(err)throw err;
        res.json(result);
    })

})


app.get('/daterange',(req,res)=>{

    sql=`select DISTINCT InvoiceDate from data`;
    db.query(sql,(err,result)=>{
        if(err)throw err;
        res.json(result);
    })

})

app.post('/search',(req,res)=>{
    const searchedFactory = req.body.factory;
    const searchedLocation = req.body.location;
    const searchedRegion = req.body.region;
    const searchedItem = req.body.item;
    const searchedSalesperson = req.body.salesperson;
    const searchedStartdate = req.body.startdate;
    const searchedEnddate = req.body.enddate;
    
    sql = `SELECT 
    InvoiceDate, ItemID, Quantity, Sales, Cost, CustomerID, Location, Factory, SalesPerson, Transactions, Region
    FROM data
    WHERE
    InvoiceDate >= '${searchedStartdate}T18:30:00:000Z'
    AND InvoiceDate <= '${searchedEnddate}T18:30:00:000Z'
    AND Factory LIKE '%${searchedFactory}%'
    AND Location LIKE '%${searchedLocation}%'
    AND Region LIKE '%${searchedRegion}%'
    AND ItemID LIKE '%${searchedItem}%'
    AND SalesPerson LIKE '%${searchedSalesperson}%'
    ORDER BY Sales DESC
    `

    db.query(sql,(err,result)=>{
        if(err)throw err;
        else{
            res.json(result);
        }   
        
    })

})

//Listening to port
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('Process started at port:3000');    
})

