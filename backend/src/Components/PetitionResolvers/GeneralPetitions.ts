import { Router, Request, Response } from "express";
import Database from "../Database";
import SubdelegationsInfo from "src/Interfaces/SubdelegationsInfo";

let db: Database = new Database();
const GeneralRouter = Router();

// Matches: /api/index/foo
GeneralRouter.get("/currentDepartments", async (req: Request, res: Response) => {
  const departments:SubdelegationsInfo[] = await db.GetDepartments();

  res.status(200).json({ departments });
});

export default GeneralRouter;