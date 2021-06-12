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

//get all tasks
app.get('/tasks', async (req, res) => {
    try {
        if(!req.query) req.query = {};

        const tasks = await dao.getTasksUntilDate(req.query.untilDate || Number.MAX_SAFE_INTEGER);

        res.status(200).send(tasks);
    }  
    catch(err) {
        res.status(400).send(err);
    }

});

//add task
app.put("/tasks", async (req,res)=> {
    try {
        await dao.addTask(req.body.task);
        res.status(200).send();
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
});

//update task
app.post('/tasks/:id', async(req,res)=> {
    try {
        const oldTask = await dao.getTask(req.params.id);
        const newTask = req.body.task;
        const updateObj = {
            description: newTask.description || oldTask.description || "",
            location: newTask.location || oldTask.description || "",
            importance: newTask.importance || oldTask.importance || "D",
            date: newTask.date || oldTask.date || 0,
        }
        const result = await dao.updateTask(req.params.id, updateObj);
        res.status(200).send(result);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
        return;
    }

    try {
        const result = await dao.updateTask(req.params.id, req.body.task);
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
})

app.delete("/tasks/:id",(req,res)=>{
    try {
        const result = await dao.deleteTask(req.params.id);
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.listen(port, () => {
    console.log("BluTask server listening at port " + port);
});