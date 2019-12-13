const express = require('express');
const Projects = require('./project-model.js');
const router = express.Router();

// GET - fetch all projects
router.get('/', (req, res) => {
    Projects.getProjects()
        .then(projects => {
            projects.forEach(project => project.completed ? project.completed = true : project.completed = false)
            res.status(200).json(projects);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get projects.' });
        });
});

// GET - fetch single project by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Projects.getProjectById(id)
        .then(project => {
            if (project) {
                if (project.completed) {
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

// GET - fetch project tasks
router.get('/:id/tasks', (req, res) => {
    const { id } = req.params;
    Projects.getProjectTasks(id)
        .then(proj_tasks => {
            res.status(200).json(proj_tasks);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get project tasks.' });
        });
})

// GET - fetch project resources
router.get('/:id/resources', (req, res) => {
    const { id } = req.params;
    Projects.getProjectResources(id)
        .then(proj_resources => {
            res.status(200).json(proj_resources);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get project resources.' });
        });
})

// GET - fetch complex project with tasks and resources
router.get('/:id/complex', (req, res) => {
    const { id } = req.params;
    Projects.getComplexProject(id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get project.' });
        });
})

// POST - add a project
router.post('/', (req, res) => {
    const projectData = req.body;
    Projects.addProject(projectData)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to create new project.' });
        });
});

//PUT - update a project
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    Projects.getProjectById(id)
        .then(project => {
            if (project) {
                Projects.updateProject(changes, id)
                    .then(updatedProject => {
                        res.status(202).json(updatedProject);
                    });
            } else {
                res.status(404).json({ message: 'Could not find project with given id.' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to update project.' });
        });
});

// DELETE - remove a project
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Projects.removeProject(id)
        .then(deleted => {
            if (deleted) {
                res.status(200).json({ removed: deleted });
            } else {
                res.status(404).json({ message: 'Could not find project with given id.' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete project.' });
        });
});

module.exports = router;