import express, { Request, Response } from "express";
import cors from "cors";
import Database from "../Components/Database";

const app = express();
const db:Database = new Database();

app.use(cors());
app.use(express.json());

app.post("/api/newForm", async (req: Request, res: Response) => {
  //First verify that fields are not empty
  if(req.body.department != "" && req.body.description != "") {
    let operationResult: boolean = false;
    
    switch(req.body.documentType) {
      case "Idea":
        operationResult = await db.InsertNewIdea(req.body.department, req.body.description);
        break;

      case "Suggestion":
        operationResult = await db.InsertNewSuggestion(req.body.department, req.body.description);
        break;

      case "Complaint":
        operationResult = await db.InsertNewComplaint(req.body.department, req.body.description);
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

app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});
