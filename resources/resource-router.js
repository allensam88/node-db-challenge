const express = require('express');
const Resources = require('./resource-model.js');
const router = express.Router();

// fetch all resources
router.get('/', (req, res) => {
    Resources.getResources()
        .then(resources => {
            res.status(200).json(resources);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get resources.' });
        });
})

// fetch single resource by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Resources.getResourceById(id)
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
router.post('/', (req, res) => {
    const resourceData = req.body;
    Resources.addResource(resourceData)
        .then(resource => {
            res.status(201).json(resource);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to create new resource.' });
        });
});

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