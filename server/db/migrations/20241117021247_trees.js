/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('trees', function(table) {
      table.increments('id').primary()
      table.string('common_name').notNullable()
      table.string('scientific_name')
      table.string('family')
      table.decimal('height')
      table.decimal('width')
      table.decimal('trunk_diameter')
      table.string('flower_color')
      table.string('native_region')
      table.text('description')
      table.text('notes')
    })
}

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
export const down = function(knex) {
  knex.schema.dropTable('trees')
};