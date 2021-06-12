const mysql = require('mysql');
const DB_HOST = process.env.DB_HOST;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

if(!DB_NAME || !DB_PASSWORD || !DB_HOST) {
    process.exit(1);
}

const db = mysql.createConnection({
    host:DB_HOST,
    user:'root',
    password: DB_PASSWORD,
    database: DB_NAME,
});

const dao = {
    connect: () => {
        return new Promise((res,rej)=> {
            db.connect((err)=>{
                if(err) {
                    rej(err);
                } else {
                    res();
                }
            });
        });
    },

    getTasksUntilDate: (untilDate) => {
        const todayDate = Date.now();
        return new Promise((res,rej)=>{
            db.query(`select * from task where date >= ${todayDate} and date <= ${untilDate};`, (err,results,fields)=> {
                if(err) rej(err);
                else {
                    console.log(results);
                    res(results);
                }
            })
        });
    },

    addTask: (task) => {
        return new Promise((res,rej)=> {
            console.log(task);
            db.query(`insert into task (description,location,importance,date) values (
                '${task.description || 'No description'}',
                '${task.location || ''}',
                '${task.importance || 'D'}',
                ${task.date || 0}
            );`,(err,result)=>{
                if(err) rej(err);
                else res(result);
            });
        })
    },

    deleteTask: (id) => {
        return new Promise((res,rej)=> {
            console.log(id);
            db.query(`delete from task where id = ${id};`,
                (err,results)=>{
                    if(err) rej(err);
                    else res(results);
                }
            )
        })
    }

}

module.exports = dao;