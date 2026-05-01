import { Router, Request, Response } from "express";
import Database from "../Database";
import Petition from "src/Interfaces/FormRetrieval";
import { auth } from "../Auth/InnerAuthValidator";

let db: Database = new Database();
const ReviewRouter = Router();


ReviewRouter.get("/allUnresolved", async (req: Request, res: Response) => {
  const authed = auth(req);
  if(authed) {
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
  if(authed) {
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
  if(authed) {
    const type = req.body.type;
    const department = req.body.department;
    const showResolved = req.body.showResolved;

    const result:Petition[] = await db.RetrievePetitions(type, department, showResolved);

    res.status(200).json(result);
  }
  else {
    res.status(401).send({Status: "Forbidden"});
  }
});

ReviewRouter.post("/markAsResolved", async (req: Request, res: Response) => {
  const authed = auth(req);
  if(authed) {
    try {
      const id = req.body.id;
      await db.MarkPetitionAsResolved(id);
      res.status(200).json({"result": "OK"});
    }
    catch (ex) {
      res.status(500).json({"result": "Internal server error"});
    }
  }
  else {
    res.status(401).send({Status: "Forbidden"});
  }
});

ReviewRouter.delete("/deleteForm", async (req: Request, res: Response) => {
  const authed = auth(req);
  if(authed) {
    try {
      const id = req.body.id;
      await db.DeletePetition(id);
      res.status(200).json({"result": "OK"});
    }
    catch (ex) {
      res.status(500).json({"result": "Internal server error"});
    }
  }
  else {
    res.status(401).send({Status: "Forbidden"});
  }
});

export default ReviewRouter;