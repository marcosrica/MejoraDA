import { Router, Request, Response } from "express";
import Database from "../Database";
import { auth } from "../Auth/InnerAuthValidator";

let db: Database = new Database();
const DepartmentsRouter = Router();


DepartmentsRouter.post("/editDepartment", async (req: Request, res: Response) => {
  const authed = auth(req);
  if(authed) {
    try {
      const response = await db.EditDepartment(req.body.name, req.body.department_id);
      res.status(200).send({response: "OK"});
    }
    catch(ex) {
      console.log(ex);
      res.status(500).send({response: "Server error"});
    }
  }
  else {
    res.status(401).json({ result: "PROHIBITED"});
  }
});

DepartmentsRouter.post("/hideShowDepartment", async (req: Request, res: Response) => {
  const authed = auth(req);
  if(authed) {
    await db.ChangeVisibility(req.body.department_id);
    res.status(200).send({response: "OK"});
  }
  else {
    res.status(401).json({ result: "PROHIBITED"});
  }
});

DepartmentsRouter.post("/newDepartment", async (req: Request, res: Response) => {
  const authed = auth(req);
  if(authed) {
    const response = await db.AddDepartment(req.body.name);
    res.status(200).send({response: "OK"});
  }
  else {
    res.status(401).json({ result: "PROHIBITED"});
  }
});

DepartmentsRouter.post("/deleteDepartment", async (req: Request, res: Response) => {
  const authed = auth(req);
  if(authed) {
    try {
      const response = await db.DeleteDepartment(req.body.department_id);
      res.status(200).send({response: "OK"});
    }
    catch(ex) {
      console.log(ex);
      res.status(500).send({response: "Server error"});
    }  
  }
  else {
    res.status(401).json({ result: "PROHIBITED"});
  }
});

export default DepartmentsRouter;