import { Router, Request, Response } from "express";
import Database from "../Database";

let db: Database = new Database();
const FormRouter = Router();

// Matches: /api/index/foo
FormRouter.post("/newForm", async (req: Request, res: Response) => {
  console.log("Received new form submission:", req.body);
  //TODO: Handle form submission
  res.status(200);
});

export default FormRouter;