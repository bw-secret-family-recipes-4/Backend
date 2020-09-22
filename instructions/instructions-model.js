const db = require('../data/db.config');

module.exports = {
    getInstructions,
    findByInstructionId,
    addInstruction,
    editInstruction,
    deleteInstruction
}

function getInstructions(){
    return db('instructions')
}

function findByInstructionId(id){
    return db('instructions').where( {id} ).first()
}

function addInstruction(instruction){
    return db('instructions')
    .insert(instruction, 'id')
    .then(([id]) => {
        return db('instructions')
        .where({ id })
        .first()
    })
}

function editInstruction(changes, id){
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

