import { Router, Request, Response } from "express";
import Database from "../Database";
import Petition from "src/Interfaces/FormRetrieval";
import { auth } from "../Auth/InnerAuthValidator";

let db: Database = new Database();
const ReviewRouter = Router();


ReviewRouter.get("/allUnresolved", async (req: Request, res: Response) => {
  const authed = auth(req);
  if(authed > 1) {
    console.log("Received new unresolved petitions request");
    //TODO: Handle retrieval of unresolved petitions
    res.status(200).json({Result: "OK"});
  }
  else {
    res.status(401).send({Status: "Forbidden"});
  }
});

ReviewRouter.post("/unresolvedQuantity", async (req: Request, res: Response) => {
  const authed = auth(req);
  if(authed > 1) {
    console.log("Received new unresolved petitions request for a specific department");
    //TODO: Handle retrieval of unresolved petitions of a specific department
    res.status(200).send({ quantity: 100 });
  }
  else {
    res.status(401).send({Status: "Forbidden"});
  }
});

ReviewRouter.post("/filter", async (req: Request, res: Response) => {
  const authed = auth(req);

  const type = req.body.type;
  const department = req.body.department;
  const showResolved = req.body.showResolved;
 
  if(authed > 1) {
    const result:Petition[] = await db.RetrievePetitions(type, department, showResolved);

    await db.AddLog(authed, req.ip || "", "Retrieved " + result.length + " petitions with filters: TYPE=" + type + "; DEPARTMENT=" + department + "; SHOW_RESOLVED=" + showResolved);
    res.status(200).json(result);
  }
  else {
    await db.AddLog(1, req.ip || "", "Tried to retrieve petitions with filters: TYPE=" + type + "; DEPARTMENT=" + department + "; SHOW_RESOLVED=" + showResolved);
    res.status(401).send({Status: "Forbidden"});
  }
});

ReviewRouter.post("/markAsResolved", async (req: Request, res: Response) => {
  const authed = auth(req);
  const id = req.body.id;

  if(authed > 1) {
    try {
      await db.MarkPetitionAsResolved(id);
      await db.AddLog(authed, req.ip || "", "Marked petition with ID=" + id + " as resolved");
      res.status(200).json({"result": "OK"});
    }
    catch (ex) {
      await db.AddLog(authed, req.ip || "", "Error while marking petition with ID=" + id + " as resolved");
      res.status(500).json({"result": "Internal server error"});
    }
  }
  else {
    await db.AddLog(1, req.ip || "", "Tried to mark petition with ID=" + id + " as resolved");
    res.status(401).send({Status: "Forbidden"});
  }
});

ReviewRouter.delete("/deleteForm", async (req: Request, res: Response) => {
  const authed = auth(req);
  const id = req.body.id;

  if(authed > 1) {
    try {
      await db.DeletePetition(id);
      await db.AddLog(authed, req.ip || "", "Deleted petition with id=" + id);
      res.status(200).json({"result": "OK"});
    }
    catch (ex) {
      await db.AddLog(authed, req.ip || "", "Error while deleting petition with id=" + id);
      res.status(500).json({"result": "Internal server error"});
    }
  }
  else {
    await db.AddLog(1, req.ip || "", "Tried to delete petition with id=" + id);
    res.status(401).send({Status: "Forbidden"});
  }
});

export default ReviewRouter;