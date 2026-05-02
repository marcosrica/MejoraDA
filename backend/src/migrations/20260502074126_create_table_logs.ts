import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('logs', (table) => {
        table.increments('id');
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
        
        table.string('ip').notNullable();
        table.text('description').notNullable();
        table.timestamp('created').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('logs');
}

