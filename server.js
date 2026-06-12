const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let tasks = [];
let id = 1;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// API endpoint to get tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// API endpoint to add a task
app.post('/api/tasks', (req, res) => {
    const task = {
        id: id++,
        name: req.body.name,
        dueDate: req.body.dueDate,
        category: req.body.category,
        description: req.body.description,
        priority: req.body.priority,
        completed: req.body.completed,
        subtasks: req.body.subtasks || []  // Ensure subtasks are handled
    };
    tasks.push(task);
    res.json(task);
});


// API endpoint to update a task
app.put('/api/tasks/:id', (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.id));
    if (task) {
        task.name = req.body.name;
        task.dueDate = req.body.dueDate;
        task.category = req.body.category;
        task.description = req.body.description;
        task.priority = req.body.priority;
        task.completed = req.body.completed;
        res.json(task);
    } else {
        res.status(404).send();
    }
});

// API endpoint to delete a task
app.delete('/api/tasks/:id', (req, res) => {
    tasks = tasks.filter(task => task.id !== parseInt(req.params.id));
    res.status(204).send();
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
