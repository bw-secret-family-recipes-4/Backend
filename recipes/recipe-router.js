const express = require('express');

const recipes = require('./recipe-model.js');

const ingredients = require('../ingredients/ingredients-model')
const instructions = require('../instructions/instructions-model')
const router = express.Router();

router.get('/', (req, res) => {
    recipes.findRecipes()
    .then(recipes => {
        res.status(200).json(recipes)
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })

});

router.get('/:id', validateRecipeId, (req, res) => {
    recipes.findRecipesById(req.params.id)
    .then(recipe => {
        ingredients.getIngredientByRecipeId(recipe.id)
        .then(ing => {
            const ingredients = ing
            instructions.findInstrutionsByRecipeId(recipe.id)
            .then(instr => {
                const instructions = instr
                res.status(200).json({data: recipe, ingredients, instructions})
            })
            
        })
        
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get recipes' })
    })
});
router.get('/users/:userid', (req, res) => {
    recipes.getRecipeByUserId(req.params.userid)
    .then(recipes => {
        res.status(200).json(recipes)
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

router.post('/', (req, res) => {
    recipes.addRecipe(req.body)
    .then(newRecipe => {
        res.status(201).json(newRecipe)
    })
    .catch(err => {
        res.status(500).json({message: err.message })
    })
})

router.put('/:id', validateRecipeId, (req, res) => {
    recipes.updateRecipe(req.body, req.params.id)
    .then(recipe => {
        res.status(200).json(recipe)
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

router.delete('/:id', validateRecipeId, (req, res) => {
    recipes.deleteRecipe(req.params.id)
    .then(recipe => {
        res.status(200).json(recipe)
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})


function validateRecipeId(req, res, next){
    recipes.findRecipesById(req.params.id)
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





module.exports = router;