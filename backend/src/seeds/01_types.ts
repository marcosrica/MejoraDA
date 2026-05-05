import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("types").del();

    // Inserts seed entries
    await knex("types").insert([
        { name: "Sugerencia" },
        { name: "Idea" },
        { name: "Queja" }
    ]);
};
