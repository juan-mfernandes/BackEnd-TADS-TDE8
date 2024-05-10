const express = require('express');
const { findTasks, findTaksStatus, createTask, updateTask, deleteTask } = require('../project/db/tasks');
const taskRouters = express.Router();

taskRouters.get("/tasks", async(req, res) => {
    const isDone = req.query.isDone;
    if (isDone !== undefined) {
        const tasks = await findTaksStatus(isDone);
        if(!tasks) return res.status(404).send("Tasks NOT FOUND.");
        return res.json(tasks);
    }
    const allTasks = await findTasks();
    if(!allTasks) return res.status(404).send("Tasks NOT FOUND.");
    return res.json(allTasks);
});

taskRouters.post("/tasks/", async(req, res) => {
    const data = req.body;
    const filteredTasks = findTasks();
    const newTask = await createTask(data);
    if(newTask.name === filteredTasks.name) return res.send("The task name alredy exists.");
    res.json(newTask);
});

taskRouters.put("/tasks/:id", async(req, res) => {
    const id = req.params.id;
    if(!id) return res.status(404).send(`id ${id} Not Found`);
    const data = req.body;
    const updatedTask = await updateTask(id, data);
    res.json(updatedTask);
});

taskRouters.delete("/tasks/:id", async(req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(404).send(`id ${id} Not Found`);
    const deletedTask = await deleteTask(id);
    res.json(deletedTask);
});

module.exports = { taskRouters };

// let tasks = [
//     {   
//         "id": 1,
//         "name": "Comprar leite",
//         "description": "Ir ao mercado da esquina e comprar leite.",
//         "isDone": false
//     },
//     {
//         "id": 2,
//         "name": "Lavar o carro",
//         "description": "Birar o carro da garagem e lava-lo.",
//         "isDone": true
//     },
//     {
//         "id": 3,
//         "name": "Beber agua",
//         "description": "Beber pelo menos 3 litros de agua no dia.",
//         "isDone": true
//     },
//     {
//         "id": 4,
//         "name": "Limpar a casa",
//         "description": "Limpar a casa apos as 14:30h da tarde.",
//         "isDone": false
//     },
//     {
//         "id": 5,
//         "name": "Fazer um bolo",
//         "description": "Fazer o bolo prometido para a festa de aniversario.",
//         "isDone": false
//     },
// ];