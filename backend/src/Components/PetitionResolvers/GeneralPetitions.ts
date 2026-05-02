import { Router, Request, Response } from "express";
import Database from "../Database";
import SubdelegationsInfo from "src/Interfaces/SubdelegationsInfo";
import TypeInfo from "src/Interfaces/TypeInfo";

let db: Database = new Database();
const GeneralRouter = Router();

GeneralRouter.get("/currentDepartments", async (req: Request, res: Response) => {
  const departments:SubdelegationsInfo[] = await db.GetDepartments();

  res.status(200).json({ departments });
});

GeneralRouter.get("/currentTypes", async (req: Request, res: Response) => {
  const types:TypeInfo[] = await db.GetTypes();

  console.log("Types: ");
  console.log(types);

  res.status(200).json({ types });
});

export default GeneralRouter;