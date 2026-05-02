import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('departments', (table) => {
        table.increments('id_department');
        table.string('department_name').notNullable();
        table.boolean('show_department').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('departments');
}

