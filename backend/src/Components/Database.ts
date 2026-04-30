import mysql from 'mysql2';
import { ResultSetHeader } from 'mysql2/promise';
import { DatabaseKeys } from '../../keys';
import Petition from '../Interfaces/FormRetrieval';
import SubdelegationsInfo from 'src/Interfaces/SubdelegationsInfo';
import { RowDataPacket } from 'mysql2/promise';
import TypeInfo from 'src/Interfaces/TypeInfo';

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

    RetrievePetitions = async (type:number, department:number, showResolved:boolean): Promise<Petition[]>  => {
        const [response] = await pool.query<RowDataPacket[]> (`
            SELECT * FROM forms     
            WHERE (resolved = 0 OR ? = 1) 
            AND (? = 0 OR id_department = ?)
            AND (? = 0 OR id_type = ?)     
            `, [showResolved, department, department, type, type]);
        
        console.log(response);

        const departments:SubdelegationsInfo[] = await this.GetDepartments();
        const types:TypeInfo[] = await this.GetTypes();

        const result:Petition[] = [];
        
        for(const form of response) {
            result.push({request_id:form.id_form, type:this.mapToType(form.id_type, types), department:this.mapToDepartment(form.id_department, departments), subject:form.subject, description:form.description, solved:form.resolved});
        }

        return result;
    }

    MarkPetitionAsResolved = async (id:number) => {
        const response = await pool.query(`
          UPDATE forms
          SET resolved = true
          WHERE id_form = ?
        `, [id]);
    }

    DeletePetition = async (id:number) => {
        const [response] = await pool.query(`
            DELETE FROM forms
            WHERE id_form = ?
            `, [id]);
    }
// #endregion

// #region Types

    GetTypes = async ():Promise<TypeInfo[]> => {
        const [response] = await pool.query<RowDataPacket[]>(`
            SELECT id_type, name
            FROM types
            `, []);

        const result:TypeInfo[] = [];
        for(const type of response) {
            result.push({inner_id:type.id_type, name:type.name});
        }
        
        return result;
    }

// #endregion

    mapToDepartment(id:number, departments:SubdelegationsInfo[]):string {
        let result:string = "ERROR";

        departments.forEach((department) => {
            if(department.innerID == id) {
                result = department.name;
            }
        });

        return result;
    }

    mapToType(id:number, types:TypeInfo[]):string {
        let result:string = "ERROR";

        types.forEach((type) => {
            if(type.inner_id == id) {
                result = type.name;
            }
        });

        return result;
    }

}


export default Database;
