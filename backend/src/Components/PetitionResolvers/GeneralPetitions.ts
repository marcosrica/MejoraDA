import { Router, Request, Response } from "express";
import Database from "../Database";

let db: Database = new Database();
const GeneralRouter = Router();

// Matches: /api/index/foo
GeneralRouter.get("/currentDepartments", async (req: Request, res: Response) => {
  console.log("Received new departments request");
  //TODO: Handle departments retrieval
  res.status(200);
});

export default GeneralRouter;