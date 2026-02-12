import { Router, Request, Response } from "express";
import Database from "../Database";

let db: Database = new Database();
const DepartmentsRouter = Router();


DepartmentsRouter.post("/editDepartment", async (req: Request, res: Response) => {
  try {
    const response = await db.EditDepartment(req.body.name, req.body.department_id);
    res.status(200).send({response: "OK"});
  }
  catch(ex) {
    console.log(ex);
    res.status(500).send({response: "Server error"});
  }
});

DepartmentsRouter.post("/hideShowDepartment", async (req: Request, res: Response) => {
  await db.ChangeVisibility(req.body.department_id);
  res.status(200).send({response: "OK"});
});

DepartmentsRouter.post("/newDepartment", async (req: Request, res: Response) => {
  console.log("Received a request to create a new department named: " + req.body.name);
  
  const response = await db.AddDepartment(req.body.name);

  res.status(200).send({response: "OK"});
});

DepartmentsRouter.post("/deleteDepartment", async (req: Request, res: Response) => {
  console.log(req.body.department_id);
  try {
    const response = await db.DeleteDepartment(req.body.department_id);
    res.status(200).send({response: "OK"});
  }
  catch(ex) {
    console.log(ex);
    res.status(500).send({response: "Server error"});
  }
});

export default DepartmentsRouter;