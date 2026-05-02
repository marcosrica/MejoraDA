import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('types', (table) => {
        table.increments("id_type");
        table.string("name");   
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('types');
}

