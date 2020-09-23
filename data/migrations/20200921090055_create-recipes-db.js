
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments()
      tbl.string('username', 128)
      .notNullable()
      .unique()
      tbl.string('password', 128)
      .notNullable()
  })
  .createTable('recipes', tbl => {
      tbl.increments()
      tbl.string('title', 128)
      .notNullable()
      tbl.string('source', 128)
      tbl.string('category', 128)
      tbl.string('image_url', 256)
  })
  .createTable('instructions', tbl => {
      tbl.increments()
      tbl.string('steps', 128)
      .notNullable()
      tbl.integer('recipe_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('recipes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
  .createTable('ingredients', tbl => {
      tbl.increments()
      tbl.string('ingredient_name', 128)
      .notNullable()
      tbl.integer('recipe_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('recipes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('ingredients')
  .dropTableIfExists('instructions')
  .dropTableIfExists('recipes')
  .dropTableIfExists('users')
};
