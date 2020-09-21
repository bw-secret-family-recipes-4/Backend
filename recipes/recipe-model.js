const db = require('../data/db.config');

module.exports = {
    findRecipes,
    findRecipesById,
    addRecipe,
    updateRecipe,
    deleteRecipe
}

function findRecipes(){
    return db('recipes')
    .join('ingredients', 'recipes.id', '=', 'ingredients.recipe_id')
    .join('instructions', 'recipes.id', '=', 'instructions.recipe_id')
    .select('recipes.title', 'recipes.category', 'recipes.source', 'instructions.steps', 'ingredients.ingredient_name')
};

function findRecipesById(id){
    return db('recipes')
    .join('ingredients', 'recipes.id', '=', 'ingredients.recipe_id')
    .join('instructions', 'recipes.id', '=', 'instructions.recipe_id')
    .select('recipes.title', 'recipes.category', 'recipes.source', 'instructions.steps', 'ingredients.ingredient_name')
    .where({ id }).first();
}

function addRecipe(recipe){
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
