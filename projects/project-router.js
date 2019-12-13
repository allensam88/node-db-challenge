const express = require('express');
const Projects = require('./project-model.js');
const router = express.Router();

// fetch all projects
router.get('/projects', (req, res) => {
    Projects.getProjects()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get projects.' });
        });
});

// trying to change boolean values when fetching all projects
// router.get('/projects', (req, res) => {
//     Projects.getProjects()
//         .then(projects => {        
//                 let booleanProjects = projects.map(project => {
//                 if (project.completed === 1) {
//                     project.completed = true
//                     res.status(200).json(booleanProjects);
//                 } else {
//                     project.completed = false
//                     res.status(200).json(booleanProjects);
//                 }
//                 })        
//         })
//         .catch(err => {
//             res.status(500).json({ message: 'Failed to get projects.' });
//         });
// });

// fetch single project by id
router.get('/projects/:id', (req, res) => {
    const { id } = req.params;
    Projects.getProjectById(id)
        .then(project => {
            if (project) {
                if (project.completed === 1) {
                    project.completed = true
                    res.status(200).json(project);
                } else {
                    project.completed = false
                    res.status(200).json(project);
                }
            } else {
                res.status(404).json({ message: 'Could not find project with given id.' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get project.' });
        });
});

// add a project
router.post('/projects', (req, res) => {
    const projectData = req.body;
    Projects.addProject(projectData)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to create new project.' });
        });
});

// fetch all resources
router.get('/resources', (req, res) => {
    Projects.getResources()
        .then(resources => {
            res.status(200).json(resources);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get resources.' });
        });
})

// fetch single resource by id
router.get('/resources/:id', (req, res) => {
    const { id } = req.params;
    Projects.getResourceById(id)
        .then(resource => {
            if (resource) {
                res.status(200).json(resource);
            } else {
                res.status(404).json({ message: 'Could not find resource with given id.' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get resource.' });
        });
});

// add a resource
router.post('/resources', (req, res) => {
    const resourceData = req.body;
    Projects.addResource(resourceData)
        .then(resource => {
            res.status(201).json(resource);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to create new resource.' });
        });
});

// fetch all tasks with project name and description
router.get('/tasks', (req, res) => {
    Projects.getTasks()
        .then(tasks => {
            res.status(200).json(tasks);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get tasks.' });
        });
})

// fetch single task by id
router.get('/tasks/:id', (req, res) => {
    const { id } = req.params;
    Projects.getTaskById(id)
        .then(task => {
            if (task) {
                res.status(200).json(task);
            } else {
                res.status(404).json({ message: 'Could not find task with given id.' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get task.' });
        });
});

// add a task
router.post('/tasks', (req, res) => {
    const { id } = req.params;
    const taskData = req.body;
    Projects.addTask(taskData, id)
        .then(task => {
            res.status(201).json(task);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to create new task.' });
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