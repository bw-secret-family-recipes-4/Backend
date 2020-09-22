const db = require('../data/db.config');

module.exports = {
    findRecipes,
    findRecipesById,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipeByUserId
}

function findRecipes(){
    return db('recipes')
};
function getRecipeByUserId(user_id){
    return db('recipes').where({user_id})

}

function findRecipesById(id){
    return db('recipes')
    .where({ id }).first();
}

async function addRecipe(recipe){
    return db('recipes')
    .insert(recipe)
    .returning("id")
    .then(ids => {
        const id = ids[0]
        return findRecipesById(id)
    })
}

function updateRecipe(changes, id){
    return db('recipes')
    .where({ id })
    .update(changes)
    .then(() => {
        return findRecipesById(id)
    })
}

function deleteRecipe(id){
    return db("recipes")
    .where({ id })
    .del()
}
