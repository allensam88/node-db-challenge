const db = require('../data/db-config.js');

module.exports = {
    getProjects,
    getProjectById,
    getProjectTasks,
    getProjectResources,
    getComplexProject,
    addProject,
    updateProject,
    removeProject
};

// fetch all projects
function getProjects() {
    return db('projects')
}

// fetch single project
function getProjectById(id) {
    return db('projects')
        .where({ id })
        .first();
}

// fetch project tasks
function getProjectTasks(id) {
    return db('tasks')
    .select(
    'tasks.description as task',
    'tasks.notes as notes',
    'tasks.completed')
    .where('project_id', id)
}

// fetch project resources
function getProjectResources(id) {
    return db('project_resources')
        .join('resources', 'project_resources.resource_id', 'resources.id' )
        .where('project_resources.project_id', id)
}

// fetch a complex project with all tasks and resources
function getComplexProject(id) {
    const promises = [getProjectById(id), getProjectTasks(id), getProjectResources(id)]
    return Promise.all(promises)
        .then(function (results) {
            let [project, tasks, resources] = results;
            if (project) {
                project.tasks = tasks;
                project.resources = resources;
                return project
            }
        })
}

// add a project
function addProject(project) {
    return db('projects')
        .insert(project, 'id')
        .then(ids => {
            const [id] = ids;
            return getProjectById(id);
        });
}

// update a project
function updateProject(changes, id) {
    return db('projects')
        .where({ id })
        .update(changes)
        .then(count => {
            return getProjectById(id);
        });
}

// delete a project
function removeProject(id) {
    const deletedProject = getProjectById(id).then(item => item);
    return db('projects')
        .where({ id })
        .del()
        .then(count => {
            return deletedProject
        });
}