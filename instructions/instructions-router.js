const express = require('express')

const instructions = require('../instructions/instructions-model')
const recipes = require('../recipes/recipe-model')
const router = express.Router()

router.get('/', (req, res) => {
    instructions.getInstructions()
    .then(instructions => {
        res.status(200).json(instructions)
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get instructions' })
    })
})

router.get('/:id', (req, res) => {
    instructions.findByInstructionId(req.params.id)
    .then(recipe => {
        res.status(200).json(recipe)
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get step' })
    })
});


router.post('/', (req, res) => {
    instructions.addInstruction(req.body)
    .then(newStep => {
        res.status(201).json(newStep)
    })
    .catch(err => {
        res.status(500).json({message: err.message })
    })
})

router.put('/:id', validateRecipeId, (req, res) => {
    instructions.editInstruction(req.body, req.params.id)
    .then(step => {
        res.status(200).json(step)
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

router.delete('/:id', validateRecipeId, (req, res) => {
    instructions.deleteInstruction(req.params.id)
    .then(recipe => {
        res.status(200).json(recipe)
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
