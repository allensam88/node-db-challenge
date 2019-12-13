const express = require('express');
const Tasks = require('./task-model.js');
const router = express.Router();

// fetch all tasks with project name and description
router.get('/', (req, res) => {
    Tasks.getTasks()
        .then(tasks => {
            tasks.forEach(task => task.completed ? task.completed = true : task.completed = false)
            res.status(200).json(tasks);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get tasks.' });
        });
})

// fetch single task by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Tasks.getTaskById(id)
        .then(task => {
            if (task) {
                if (task.completed) {
                    task.completed = true
                    res.status(200).json(task);
                } else {
                    task.completed = false
                    res.status(200).json(task);
                }
            } else {
                res.status(404).json({ message: 'Could not find task with given id.' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get task.' });
        });
});

// add a task
router.post('/', (req, res) => {
    const { id } = req.params;
    const taskData = req.body;
    Tasks.addTask(taskData, id)
        .then(task => {
            res.status(201).json(task);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to create new task.' });
        });
})

router.get('/projects/:id/complex', (req, res) => {
    const { id } = req.params;
    Projects.getComplexProject(id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get project.' });
        });
})

// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const changes = req.body;
//     Recipes.getRecipeById(id)
//         .then(recipe => {
//             if (recipe) {
//                 Recipes.updateRecipe(changes, id)
//                     .then(updatedRecipe => {
//                         res.status(202).json(updatedRecipe);
//                     });
//             } else {
//                 res.status(404).json({ message: 'Could not find recipe with given id.' });
//             }
//         })
//         .catch(err => {
//             res.status(500).json({ message: 'Failed to update recipe.' });
//         });
// });

// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     Recipes.removeRecipe(id)
//         .then(deleted => {
//             if (deleted) {
//                 res.status(200).json({ removed: deleted });
//             } else {
//                 res.status(404).json({ message: 'Could not find recipe with given id.' });
//             }
//         })
//         .catch(err => {
//             res.status(500).json({ message: 'Failed to delete recipe.' });
//         });
// });

module.exports = router;