import type { Knex } from "knex";
import bcrypt from 'bcrypt';
import { AdminCreation, Secrets } from "./../../keys";

const AdminData:AdminCreation = new AdminCreation();
const secrets:Secrets = new Secrets();

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    const hashedPassword:string = await bcrypt.hash(AdminData.AdminPassword, secrets.SaltRounds);

    // Inserts seed entries
    await knex("users").insert([
        { username: AdminData.AdminUsername, password: hashedPassword },
    ]);
};
