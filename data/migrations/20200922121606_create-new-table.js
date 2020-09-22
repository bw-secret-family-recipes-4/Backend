
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
        tbl.string('steps', 1000)
        tbl.string('ingredients', 1000)
        tbl.integer('user_id')
        .unsigned()
        .references("id")
        .inTable("users")
        .notNullable()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('recipes')
    .dropTableIfExists('users')
};
