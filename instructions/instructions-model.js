const db = require('../data/db.config');

module.exports = {
    getInstructions,
    findByInstructionId,
    addInstruction,
    editInstruction,
    deleteInstruction,
    findInstrutionsByRecipeId
}

function getInstructions(){
    return db('instructions')
}

function findInstrutionsByRecipeId(id){
    return db('instructions').where( {recipe_id: id} )
}
function findByInstructionId(id){
    return db('instructions').where({id})
}

async function addInstruction(instruction){
    return db('instructions')
    .insert(instruction, 'id')
    .then(([id]) => {
        return db('instructions')
        .where({ id })
        .first()
    })
}

async function editInstruction(changes, id){
    return db('instructions')
    .where({ id })
    .update(changes)
    .then(() => {
        return findByInstructionId(id)
    })
}

function deleteInstruction(id){
    return db('instructions')
    .where({ id })
    .del()
}

