import { Router, Request, Response } from "express";
import Database from "../Database";

let db: Database = new Database();
const DepartmentsRouter = Router();


DepartmentsRouter.post("/editDepartment", async (req: Request, res: Response) => {
  console.log("Received new request to edit a department");
  //TODO: Handle the edition of the department
  res.status(200).send({response: "OK"});
});

DepartmentsRouter.post("/newDepartment", async (req: Request, res: Response) => {
  console.log("Received a request to create a new department");
  //TODO: Handle the creation of the new department
  res.status(200).send({response: "OK"});
});

DepartmentsRouter.post("/deleteDepartment", async (req: Request, res: Response) => {
  console.log("Received new request to delete a department");
  //TODO: Handle the deletion of the department
  res.status(200).send({response: "OK"});
});

export default DepartmentsRouter;