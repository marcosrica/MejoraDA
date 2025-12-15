import mysql from 'mysql2';
import { ResultSetHeader } from 'mysql2/promise';
import DatabaseKeys from '../keys';

const dbKeys = new DatabaseKeys();
const pool = mysql.createPool({
    host: dbKeys.host,
    user: dbKeys.user,
    password: dbKeys.password,
    database: dbKeys.database,
    
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
}).promise();

class Database {
    InsertNewIdea = async (department: string, description: string): Promise<boolean> => {
        const [result]:[ResultSetHeader, any] = await pool.query(`
                INSERT INTO ideas (department, description) 
                VALUES (?, ?)
            `, [department, description]);

        return (result.affectedRows === 1) && (result.insertId > 0);
    }

    InsertNewSuggestion = async (department: string, description: string): Promise<boolean> => {
        const [result]:[ResultSetHeader, any] = await pool.query(`
                INSERT INTO suggestions (department, description) 
                VALUES (?, ?)
            `, [department, description]);

        return (result.affectedRows === 1) && (result.insertId > 0);
    }

    InsertNewComplaint = async (department: string, description: string): Promise<boolean> => {
        const [result]:[ResultSetHeader, any] = await pool.query(`
                INSERT INTO complaints (department, description) 
                VALUES (?, ?)
            `, [department, description]);

        console.log(result);

        return (result.affectedRows === 1) && (result.insertId > 0);
    }

    RetrieveIdeas = async (department: string) => {
        const [result]:[ResultSetHeader, any] = await pool.query(`
                select * from ideas 
                where department = ?
            `, [department]);

        console.log(result);
    }
}

export default Database;