const db = require('../data/db-config.js');

module.exports = {
    getResources,
    getResourceById,
    addResource,
    updateResource,
    removeResource
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

function updateResource(changes, id) {
    return db('resources')
        .where({ id })
        .update(changes)
        .then(count => {
            return getResourceById(id);
        });
}

function removeResource(id) {
    const deletedResource = getResourceById(id).then(item => item);
    return db('resources')
        .where({ id })
        .del()
        .then(count => {
            return deletedResource
        });
}