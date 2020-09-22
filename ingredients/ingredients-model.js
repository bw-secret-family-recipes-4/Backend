const db = require('../data/db.config');
const instruction = require('../instructions/instructions-model')

module.exports = {
    getIngredients,
    getIngredientById,
    addIngredients,
    editIngredients,
    deleteIngredients,
    getIngredientByRecipeId
}

function getIngredients(){
    return db('ingredients')
}

function getIngredientByRecipeId(id){
    return db('ingredients').where({ recipe_id: id })
}
function getIngredientById(id){
    return db('ingredients').where({ id })
}

async function addIngredients(instruction){
    return db('ingredients')
    .insert(instruction, 'id')
    .then(([id]) => {
        return db('ingredients')
        .where({ id })
        .first()
    })
}

async function editIngredients(changes, id){
    return db('ingredients')
    .where({ id })
    .update(changes)
    .then(() => {
        return getIngredientById(id)
    })
}

function deleteIngredients(id){
    return db('ingredients')
    .where({ id })
    .del()
}

