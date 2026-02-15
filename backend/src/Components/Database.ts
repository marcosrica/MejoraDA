import mysql from 'mysql2';
import { ResultSetHeader } from 'mysql2/promise';
import DatabaseKeys from './../../keys';
import Petition from '../Interfaces/FormRetrieval';
import SubdelegationsInfo from 'src/Interfaces/SubdelegationsInfo';
import { RowDataPacket } from 'mysql2/promise';

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
// #region departments

    AddDepartment = async (name:String) => {
        console.log("Trying to add department with name: " + name)

        const [response] = await pool.query(`
            INSERT INTO departments (department_name, show_department)
            VALUES (?, true);
            `, [name]);

        
    }

    GetDepartments = async (): Promise<SubdelegationsInfo[]> => {
        const [response] = await pool.query<RowDataPacket[]>(`
                SELECT * FROM departments;
            `, []);

        const result:SubdelegationsInfo[] = [];
        for(const department of response) {
            result.push({name: department.department_name, show: department.show_department, innerID:department.id_department});
        }

        return result;
    }

    ChangeVisibility = async (id:number) => {
        const [response] = await pool.query(`
            UPDATE departments
            SET show_department = NOT show_department
            WHERE id_department = ?
            `, [id]);
    }

    DeleteDepartment = async (id:number) => {
        const [response] = await pool.query(`
            DELETE FROM departments
            WHERE id_department = ?
            `, [id]);
    }

    EditDepartment = async (name:String, id:number) => {
        const [response] = await pool.query(`
            UPDATE departments
            SET department_name = ?
            WHERE id_department = ?
            `, [name, id]);
    }

// #endregion


// #region Forms
    InsertNewForm = async (type:number, department:number, subject:string, description:string) => {
        const [response] = await pool.query(`
            INSERT INTO forms (id_type, id_department, subject, description, resolved)
            VALUES (?, ?, ?, ?, false)
            `, [type, department, subject, description]);
    } 
// #endregion

}


export default Database;
