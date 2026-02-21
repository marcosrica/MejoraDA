import { Router, Request, Response } from "express";
import Database from "../Database";
import Petition from "src/Interfaces/FormRetrieval";

let db: Database = new Database();
const ReviewRouter = Router();


ReviewRouter.get("/allUnresolved", async (req: Request, res: Response) => {
  console.log("Received new unresolved petitions request");
  //TODO: Handle retrieval of unresolved petitions
  res.status(200);
});

ReviewRouter.post("/unresolvedQuantity", async (req: Request, res: Response) => {
  console.log("Received new unresolved petitions request for a specific department");
  //TODO: Handle retrieval of unresolved petitions of a specific department
  res.status(200).send({ quantity: 100 });
});

ReviewRouter.post("/filter", async (req: Request, res: Response) => {
  const type = req.body.type;
  const department = req.body.department;
  const showResolved = req.body.showResolved;


  console.log("Received new petition to get the forms with specific filters:");
  console.log("Type: " + type);
  console.log("Department: " + department);
  console.log("Resolved too: " + showResolved);

  const result:Petition[] = await db.RetrievePetitions(type, department, showResolved);

  res.status(200).json(result);
});

ReviewRouter.get("/markAsResolved", async (req: Request, res: Response) => {
  console.log("Received new request to mark a petition as resolved");
  //TODO: Handle marking a petition as resolved
  res.status(200);
});

ReviewRouter.get("/deleteForm", async (req: Request, res: Response) => {
  console.log("Received new request to delete a petition");
  //TODO: Handle deletion of the petition
  res.status(200);
});

export default ReviewRouter;