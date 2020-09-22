const express = require('express');

const recipes = require('../recipes/recipe-model');

const router = express.Router();

router.get('/recipes', (req, res) => {
    recipes.findRecipes()
    .then(recipes => {
        res.status(200).json(recipes)
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })

});
module.exports = router