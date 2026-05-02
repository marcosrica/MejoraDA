import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('forms', (table) => {
        table.increments('id_form');

        table.integer('id_type').unsigned().notNullable().references('id_type').inTable('types').onDelete('CASCADE');
        table.integer('id_department').unsigned().notNullable().references('id_department').inTable('departments').onDelete('CASCADE');

        table.string('subject').notNullable();
        table.text('description').notNullable();
        table.boolean('resolved').notNullable();

        table.timestamp('created').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('forms');
}

