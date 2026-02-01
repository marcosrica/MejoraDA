import { Router, Request, Response } from "express";
import Database from "../Database";
import SubdelegationsInfo from "src/Interfaces/SubdelegationsInfo";

let db: Database = new Database();
const GeneralRouter = Router();

// Matches: /api/index/foo
GeneralRouter.get("/currentDepartments", async (req: Request, res: Response) => {
  console.log("Received new departments request");
  //TODO: Handle departments retrieval

  const departments:SubdelegationsInfo[] = [
    { internalName: 'General', name: 'General' },
    { internalName: 'AtencionEstudiante', name: 'Subdelegación de Ayuda y Servicios para el Estudiante' },
    { internalName: 'Comunicacion', name: 'Subdelegación de Comunicación' },
    { internalName: 'Calidad', name: 'Subdelegación de Mediación y Calidad Académica' },
    { internalName: 'TIC', name: 'Subdelegación de Estrategia y Desarrollo Tecnológico' },
    { internalName: 'Eventos', name: 'Subdelegación de Eventos' },
    { internalName: 'Igualdad', name: 'Subdelegación de Bienestar e Igualdad Social' }
  ];
  res.status(200).json({ departments });
});

export default GeneralRouter;