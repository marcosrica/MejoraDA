import mysql from 'mysql2';
import { ResultSetHeader } from 'mysql2/promise';
import DatabaseKeys from './../../keys';
import Petition from '../Interfaces/FormRetrieval';

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
    //#region Insertions
    InsertNewIdea = async (department: string, subject: string, description: string): Promise<boolean> => {
        const [result]:[ResultSetHeader, any] = await pool.query(`
                INSERT INTO ideas (department, subject, description) 
                VALUES (?, ?, ?)
            `, [department, subject, description]);

        return (result.affectedRows === 1) && (result.insertId > 0);
    }

    InsertNewSuggestion = async (department: string, subject: string, description: string): Promise<boolean> => {
        const [result]:[ResultSetHeader, any] = await pool.query(`
                INSERT INTO suggestions (department, subject, description) 
                VALUES (?, ?, ?)
            `, [department, subject, description]);

        return (result.affectedRows === 1) && (result.insertId > 0);
    }

    InsertNewComplaint = async (department: string, subject: string, description: string): Promise<boolean> => {
        const [result]:[ResultSetHeader, any] = await pool.query(`
                INSERT INTO complaints (department, subject, description) 
                VALUES (?, ?, ?)
            `, [department, subject, description]);
        console.log(result);

        return (result.affectedRows === 1) && (result.insertId > 0);
    }
    //#endregion

    //#region Retrievals
    RetrieveIdeas = async (department:string, solvedToo:boolean): Promise<Petition[]> => {
        const [result] = await pool.query(`
            SELECT *
            FROM ideas
            WHERE (? = 'all' OR department = ?)
            AND (solved = 0 OR solved = ?)
        `, [department, department, solvedToo]);
    
        let formatted:Petition[] = [];
        (result as any[]).forEach((item) => {
            formatted.push({
                request_id: item.request_id,
                department: this.formatDepartment(item.department),
                subject: item.subject,
                description: item.description,
                type: "Idea",
                solved: item.solved,
                date: item.date,
            });
        });
        
        return formatted;
    }

    RetrieveComplaints = async (department:string, solvedToo:boolean): Promise<Petition[]> => {
        const [result] = await pool.query(`
            SELECT *
            FROM complaints
            WHERE (? = 'all' OR department = ?)
            AND (solved = 0 OR solved = ?)
        `, [department, department, solvedToo]);
    
        let formatted:Petition[] = [];
        (result as any[]).forEach((item) => {
            formatted.push({
                request_id: item.request_id,
                department: this.formatDepartment(item.department),
                subject: item.subject,
                description: item.description,
                type: "Queja",
                solved: item.solved,
                date: item.date,
            });
        });

        return formatted;
    }

    RetrieveSuggestions= async (department:string, solvedToo:boolean): Promise<Petition[]> => {
        const [result] = await pool.query(`
            SELECT *
            FROM suggestions
            WHERE (? = 'all' OR department = ?)
            AND (solved = 0 OR solved = ?)
        `, [department, department, solvedToo]);
    
        let formatted:Petition[] = [];
        (result as any[]).forEach((item) => {
            formatted.push({
                request_id: item.request_id,
                department: this.formatDepartment(item.department),
                subject: item.subject,
                description: item.description,
                type: "Sugerencia",
                solved: item.solved,
                date: item.date,
            });
        });

        return formatted;
    }
    //#endregion

    //#region auxFunctions
    formatDepartment = (department:string):string => {
        switch(department) {
            case "AtencionEstudiante":
                return "Subdelegación de Ayuda y Servicios para el Estudiante";

            case "Comunicacion":
                return "Subdelegación de Comunicación";

            case "Calidad":
                return "Subdelegación de Mediación y Calidad Académica";

            case "TIC":
                return "Subdelegación de Estrategia y Desarrollo Tecnológico";

            case "Eventos":
                return "Subdelegación de Eventos";

            case "Igualdad":
                return "Subdelegación de Bienestar e Igualdad Social";

            default:
                return department;
        }
    }
    //#endregion
}

export default Database;