import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("departments").del();

    // Inserts seed entries
    await knex("departments").insert([
        { department_name: "General", show_department: true },
        { department_name: "Delegado", show_department: true },
    ]);
};
