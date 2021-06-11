const mysql = require('mysql');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'frost-octopus',
    database: 'blutask'
});

db.connect();

db.query('select * from test', (err,res,fields)=>{
    if(err) throw err;
    console.log(results);
})

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req,res)=> {
    res.send("You've reached the BluTask server");
});

app.listen(port, () => {
    console.log("BluTask server listening at port " + port);
});