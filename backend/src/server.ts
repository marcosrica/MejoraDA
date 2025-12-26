import express, { Request, Response } from "express";
import cors from "cors";
import Database from "./Components/Database";

import GetFilters from "./Components/PetitionResolvers/GetForms";

const app = express();
let db: Database;
db = new Database();

app.use(cors());
app.use(express.json());

app.get("/Hello", (req:Request, res:Response) => {
  res.status(200).send("Hello World");
});

app.post("/api/newForm", async (req: Request, res: Response) => {
  //First verify that fields are not empty
  if(req.body.department != "" && req.body.description != "") {
    let operationResult: boolean = false;
    
    switch(req.body.documentType) {
      case "Idea":
        operationResult = await db.InsertNewIdea(req.body.department, req.body.subject, req.body.description);
        break;

      case "Suggestion":
        operationResult = await db.InsertNewSuggestion(req.body.department, req.body.subject, req.body.description);
        break;

      case "Complaint":
        operationResult = await db.InsertNewComplaint(req.body.department, req.body.subject, req.body.description);
        break;
    }

    if(operationResult) {
      res.status(200).json("Form submitted successfully");
    }
    else {
      res.status(500).json("Error submitting form");
    }
  }
  else { //Fields were empty
    res.status(404).json("Route not found");
  }
});

app.post("/api/petitions/filter", async (req: Request, res: Response) => {
  console.log("reached point. Fileds: " + req.body.department + " type: " + req.body.type);
  const filters = await GetFilters(req.body.type, req.body.department, req.body.showResolved, db);
  res.status(200).json(filters);
});

app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});
