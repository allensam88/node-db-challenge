const db = require('../data/db-config.js');

module.exports = {
    getProjects,
    getProjectById,
    addProject,
    getProjectResources,
    getProjectTasks,
    getComplexProject
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

// add a project
function addProject(project) {
    return db('projects')
        .insert(project, 'id')
        .then(ids => {
            const [id] = ids;
            return getProjectById(id);
        });
}

// fetch project resources
function getProjectResources(id) {
    return db('project_resources')
        .join('resources', 'project_resources.resource_id', 'resources.id' )
        .where('project_resources.project_id', id)
}

// fetch project tasks
function getProjectTasks(id) {
    return db('tasks')
        .where('project_id', id)
}

// fetch a complex project with all tasks and resources
function getComplexProject(id) {
    const promises = [getProjectById(id), getProjectTasks(id), getProjectTasks(id)]
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

// function updateRecipe(changes, id) {
//     return db('recipes')
//         .where({ id })
//         .update(changes)
//         .then(count => {
//             return getRecipeById(id);
//         });
// }

// function removeRecipe(id) {
//     const deletedRecipe = getRecipeById(id).then(item => item);
//     return db('recipes')
//         .where({ id })
//         .del()
//         .then(count => {
//             return deletedRecipe
//         });
// }