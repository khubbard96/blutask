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
    console.log(req.body);
    const tasks = await dao.getTasksUntilDate(req.body.untilDate);
    res.status(200).send(tasks);
});

app.post("/tasks", async (req,res)=> {
    try {
        await dao.addTask(req.body.task);
        res.status(200).send();
    } catch(err) {
        res.status(400).send(err);
    }
});

app.delete("/tasks/:id")

app.listen(port, () => {
    console.log("BluTask server listening at port " + port);
});