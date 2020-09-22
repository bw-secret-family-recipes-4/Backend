const express = require('express');

const recipes = require('../recipes/recipe-model')
const router = express.Router()
const ingredients = require('../ingredients/ingredients-model')


router.get('/', (req, res) => {
    ingredients.getIngredients()
    .then(ingr => {
        res.status(200).json(ingr)
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get ingredients' })
    })
});

router.get('/:id',(req, res) => {

    ingredients.getIngredientById(req.params.id)
    .then(ingr => {
        res.status(200).json(ingr)
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get ingredient' })
    })
});
router.get('/recipes/:id',(req, res) => {

    ingredients.getIngredientByRecipeId(req.params.id)
    .then(ingr => {
        res.status(200).json(ingr)
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get ingredient' })
    })
});

router.post('/', (req, res) => {
    // const newArray = req.body.ingredient_name.split(' , ')
    // newArray.forEach(ingr => {
           ingredients.addIngredients(req.body)
    .then(newIngredient => {
        res.status(201).json(newIngredient)
    })
    .catch(err => {
        res.status(500).json({message: err.message })
    }) 
    //)}

})

router.put('/:id', (req, res) => {
    ingredients.editIngredients(req.body, req.params.id)
    .then(ingredient => {
        res.status(200).json(ingredient)
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

router.delete('/:id', (req, res) => {
    ingredients.deleteIngredients(req.params.id)
    .then(ingredient => {
        res.status(200).json(ingredient)
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

function validateRecipeId(req, res, next){
    recipes.findRecipesById(req.body.recipe_id)
    .then(recipe => {
        if(!recipe){
            res.status(404).json({message: "Invalid recipe id"})
        } else {
            req.recipe = recipe
            next()
        }
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
}


module.exports = router