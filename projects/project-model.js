const db = require('../data/db-config.js');

module.exports = {
    getProjects,
    getProjectById,
    addProject,
    getResources,
    getResourceById,
    addResource,
    getTasks
};

// fetch all projects
function getProjects() {
    return db('projects');
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

// fetch all resources
function getResources() {
    return db('resources');
}

// fetch single resource
function getResourceById(id) {
    return db('resources')
        .where({ id })
        .first();
}

// add a resource
function addResource(resource) {
    return db('resources')
        .insert(resource, 'id')
        .then(ids => {
            const [id] = ids;
            return getResourceById(id);
        });
}

// fetch all tasks
function getTasks() {
    return db('projects')
    .join('tasks', 'projects.id', 'tasks.project_id')
    .select('projects.name as project_name', 
        'projects.description as project_description', 
        'tasks.description as task', 
        'tasks.notes as notes', 
        'tasks.completed')
}

// function getRecipeById(id) {
//     return db('recipes')
//         .where({ id })
//         .first();
// }

// function getShoppingList(id) {
//     return db('shopping_list')
//     .join('ingredients', 'shopping_list.ingredient_id', 'ingredients.id')    
//     .select('name','quantity', 'unit')
//         .where('recipe_id', id)
// }

// function getInstructions(id) {
//     return db('instructions')
//         .select('step', 'description')
//         .where('recipe_id', id)
// }



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