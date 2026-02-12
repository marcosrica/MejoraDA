import { Router, Request, Response } from "express";
import Database from "../Database";
import SubdelegationsInfo from "src/Interfaces/SubdelegationsInfo";

let db: Database = new Database();
const GeneralRouter = Router();

// Matches: /api/index/foo
GeneralRouter.get("/currentDepartments", async (req: Request, res: Response) => {
  console.log("Received new departments request");
  //TODO: Handle departments retrieval

  const departments:SubdelegationsInfo[] = await db.GetDepartments();

  res.status(200).json({ departments });
});

export default GeneralRouter;