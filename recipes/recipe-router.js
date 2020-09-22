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
    const recipeData = {
        title: req.body.title,
        source: req.body.source,
        category: req.body.category,
        image_url: req.body.image_url,
        user_id: req.body.user_id
        }
    recipes.addRecipe(recipeData)
    .then(newRecipe => {
        const instructionData = {
            steps: req.body.steps,
            recipe_id: newRecipe.id
        }
        instructions.addInstruction(instructionData)
        .then(newInstruction => {
            const ingredientsData = {
                ingredient_name: req.body.ingredient_name,
                recipe_id: newRecipe.id
            }
            ingredients.addIngredients(ingredientsData)
            .then(newIngredient => {
            res.status(201).json({data: {recipe: newRecipe, instructions: newInstruction, ingredients: newIngredient}})
            })
        })
 

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