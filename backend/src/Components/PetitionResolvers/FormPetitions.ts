import { Router, Request, Response } from "express";
import Database from "../Database";

let db: Database = new Database();
const FormRouter = Router();

// Matches: /api/index/foo
FormRouter.post("/newForm", async (req: Request, res: Response) => {
  try {
    const type = req.body.type;
    const formDepartment = req.body.department;
    const formSubject = req.body.subject; 
    const formDescription = req.body.description;

    console.log(type + "; " + formDepartment + "; " + formSubject + "; " + formDescription);
    await db.InsertNewForm(type, formDepartment, formSubject, formDescription);

    res.status(200).json({"result": "OK"});
  }
  catch(e) {
    res.status(200).json({"result": "Internal server error"});
  }
});

export default FormRouter;