const db = require('../data/db.config');

module.exports = {
    getIngredients,
    getIngredientById,
    addIngredients,
    editIngredients,
    deleteIngredients
}

function getIngredients(){
    return db('ingredients')
}

function getIngredientById(id){
    return db('ingredients').where({ id }).first()
}

function addIngredients(instruction){
    return db('ingredients')
    .insert(instruction, 'id')
    .then(([id]) => {
        return db('ingredients')
        .where({ id })
        .first()
    })
}

function editIngredients(changes, id){
    return db('ingredients')
    .where({ id })
    .update(changes)
    .then(() => {
        return findByInstructionId(id)
    })
}

function deleteIngredients(id){
    return db('ingredients')
    .where({ id })
    .del()
}

