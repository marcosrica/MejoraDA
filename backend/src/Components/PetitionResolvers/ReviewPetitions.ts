import { Router, Request, Response } from "express";
import Database from "../Database";

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
  console.log("Received new petition to get the forms with specific filters");
  //TODO: Handle retrieval of petitions that comply with certain filters
  res.status(200);
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