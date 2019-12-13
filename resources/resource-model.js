const db = require('../data/db-config.js');

module.exports = {
    getResources,
    getResourceById,
    addResource
};

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