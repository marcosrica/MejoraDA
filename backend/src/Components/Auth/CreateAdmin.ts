import bcrypt from 'bcrypt';
import { AdminCreation, Secrets } from "./../../../keys";
import Database from '../Database';

const AdminData:AdminCreation = new AdminCreation();
const secrets:Secrets = new Secrets();
const db:Database = new Database();

export default async function createAdmin() {
    const hashedPassword:string = await bcrypt.hash(AdminData.AdminPassword, secrets.SaltRounds);

    const response = await db.AddAdmin(AdminData.AdminUsername, hashedPassword);
} 