const express = require('express');
const dao = require("./dataaccess");
const app = express();
const port = 3000;

app.use(express.json());

dao.connect()
    .then(() => console.log("db connected."))
    .catch(() => console.error("connection refused."));

app.get('/', (req, res) => {
    res.send("You've reached the BluTask server");
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await dao.getTasksUntilDate(req.query.untilDate);
        res.status(200).send(tasks);
    }  
    catch(err) {
        res.status(400).send(err);
    }

});

app.post("/tasks", async (req,res)=> {
    try {
        await dao.addTask(req.body.task);
        res.status(200).send();
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
});

app.delete("/tasks/:id",(req,res)=>{
    try {
        const result = await dao.deleteTask(req.params.id);
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send(err);
    }
})

app.listen(port, () => {
    console.log("BluTask server listening at port " + port);
});