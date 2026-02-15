import { Router, Request, Response } from "express";
import Database from "../Database";

let db: Database = new Database();
const IndexPageRouter = Router();

// Matches: /api/index/foo
IndexPageRouter.get("/getTotalForms", async (req: Request, res: Response) => {
  res.status(200).json({"result": "OK"});
});

IndexPageRouter.get("/getFormsBreakdown", async (req: Request, res: Response) => {
  res.status(200).json({"result": "OK"});
});

export default IndexPageRouter;