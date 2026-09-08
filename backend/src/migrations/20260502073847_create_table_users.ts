import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.boolean('admin').notNullable().defaultTo(false);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}

