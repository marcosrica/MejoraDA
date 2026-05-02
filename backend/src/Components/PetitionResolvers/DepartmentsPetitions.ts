import { Router, Request, Response } from "express";
import Database from "../Database";
import { auth } from "../Auth/InnerAuthValidator";

let db: Database = new Database();
const DepartmentsRouter = Router();


DepartmentsRouter.post("/editDepartment", async (req: Request, res: Response) => {
  const authed = auth(req);
  if(authed > 1) {
    try {
      const response = await db.EditDepartment(req.body.name, req.body.department_id);
      await db.AddLog(authed, req.ip || "", "Edited department " + req.body.department_id + " and changed its name to " + req.body.name);
      res.status(200).send({response: "OK"});
    }
    catch(ex) {
      console.log(ex);
      await db.AddLog(authed, req.ip || "", "Error while changing department " + req.body.department_id + "'s name to " + req.body.name);
      res.status(500).send({response: "Server error"});
    }
  }
  else {
    await db.AddLog(1, req.ip || "", "Tried to change a department " + req.body.department_id + "'s name to " + req.body.name);
    res.status(401).json({ result: "PROHIBITED"});
  }
});

DepartmentsRouter.post("/hideShowDepartment", async (req: Request, res: Response) => {
  const authed = auth(req);
  if(authed > 1) {
    await db.ChangeVisibility(req.body.department_id);
    await db.AddLog(authed, req.ip || "", "Changed the department " + req.body.department_id + "'s visibility");
    res.status(200).send({response: "OK"});
  }
  else {
    await db.AddLog(1, req.ip || "", "Tried to change the department " + req.body.department_id + "'s visibility");
    res.status(401).json({ result: "PROHIBITED"});
  }
});

DepartmentsRouter.post("/newDepartment", async (req: Request, res: Response) => {
  const authed = auth(req);
  if(authed > 1) {
    const response = await db.AddDepartment(req.body.name);
    await db.AddLog(authed, req.ip || "", "Added a new department with name " + req.body.name);
    res.status(200).send({response: "OK"});
  }
  else {
    await db.AddLog(1, req.ip || "", "Tried to add a department with name " + req.body.name);
    res.status(401).json({ result: "PROHIBITED"});
  }
});

DepartmentsRouter.post("/deleteDepartment", async (req: Request, res: Response) => {
  const authed = auth(req);
  if(authed > 1) {
    try {
      const response = await db.DeleteDepartment(req.body.department_id);
      await db.AddLog(authed, req.ip || "", "Deleted department with ID " + req.body.department_id);
      res.status(200).send({response: "OK"});
    }
    catch(ex) {
      console.log(ex);
      await db.AddLog(authed, req.ip || "", "Error while deleting department with ID " + req.body.department_id);
      res.status(500).send({response: "Server error"});
    }  
  }
  else {
    await db.AddLog(1, req.ip || "", "Tried to delete department woth ID " + req.body.department_id);
    res.status(401).json({ result: "PROHIBITED"});
  }
});

export default DepartmentsRouter;