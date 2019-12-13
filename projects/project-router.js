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

// fetch single project by id
router.get('/projects/:id', (req, res) => {
    const { id } = req.params;
    Projects.getProjectById(id)
        .then(project => {
            if (project) {
                res.status(200).json(project);
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
            res.status(500).json({ message: 'Failed to get project.' });
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

// fetch all tasks
router.get('/tasks', (req, res) => {
    Projects.getTasks()
    .then(tasks => {
        res.status(200).json(tasks);
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get tasks.' });
    });
})

// add a task

// router.get('/:id/shoppingList', (req, res) => {
//     const { id } = req.params;
//     Recipes.getShoppingList(id)
//         .then(list => {
//             if (list.length) {
//                 res.status(200).json(list);
//             } else {
//                 res.status(404).json({ message: 'Could not find recipe shopping list.' })
//             }
//         })
//         .catch(err => {
//             res.status(500).json({ message: 'Failed to get shopping list.' });
//         });
// });

// router.get('/:id/instructions', (req, res) => {
//     const { id} = req.params;
//     Recipes.getInstructions(id)
//         .then(instructions => {
//             if (instructions.length) {
//                 res.status(200).json(instructions);
//             } else {
//                 res.status(404).json({ message: 'Could not find instructions.' })
//             }
//         })
//         .catch(err => {
//             res.status(500).json({ message: 'Failed to get instructions.' });
//         });
// })

// router.post('/:id/steps', (req, res) => {
//     const stepData = req.body;
//     const { id } = req.params;

//     Schemes.findById(id)
//         .then(scheme => {
//             if (scheme) {
//                 Schemes.addStep(stepData, id)
//                     .then(step => {
//                         res.status(201).json(step);
//                     })
//             } else {
//                 res.status(404).json({ message: 'Could not find scheme with given id.' })
//             }
//         })
//         .catch(err => {
//             res.status(500).json({ message: 'Failed to create new step' });
//         });
// });

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