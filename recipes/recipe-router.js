const express = require('express');

const recipes = require('./recipe-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    recipes.findRecipes()
    .then(recipes => {
        res.status(200).json(recipes)
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get recipes' })
    })
});





module.exports = router;