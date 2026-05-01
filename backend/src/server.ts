import express, { Request, Response } from "express";
import cors from "cors";
import Database from "./Components/Database";
import { Secrets } from "./../keys";

import AuthRouter from "./Components/Auth/AuthPetitions";
import GeneralRouter from "./Components/PetitionResolvers/GeneralPetitions";
import FormRouter from "./Components/PetitionResolvers/FormPetitions";
import ReviewRouter from "./Components/PetitionResolvers/ReviewPetitions";
import UsersRouter from "./Components/PetitionResolvers/UsersPetitions";
import DepartmentsRouter from "./Components/PetitionResolvers/DepartmentsPetitions";
import createAdmin from "./Components/Auth/CreateAdmin";

const cookieParser = require('cookie-parser');

const app = express();
let db: Database;
db = new Database();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", AuthRouter); //Catching all /api/auth routes
app.use("/api/general", GeneralRouter); //Catching all /api/general routes
app.use("/api/form", FormRouter); //Catching all /api/form routes
app.use("/api/review", ReviewRouter); //Catching all /api/review routes
app.use("/api/users", UsersRouter); //Catching all /api/users routes
app.use("/api/departments", DepartmentsRouter); //Catching all /api/departments routes

/*
app.get("/api/UnresolvedFormsCount", async (req:Request, res:Response) => {
  const [complaints, ideas, suggestions] = await Promise.all([
      db.RetrieveComplaints("All", false),
      db.RetrieveIdeas("All", false),
      db.RetrieveSuggestions("All", false),
  ]);

  const count = complaints.length + ideas.length + suggestions.length;
  console.log(count + "is the amount of petitions");

  res.status(200).json({count});
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

app.post("/api/petitions/markAsResolved", async (req:Request, res:Response) => {
  console.log("Reached marking as valid endpoint. Data: " + req.body.id + ";   Data type: " + typeof req.body.id)
  let result:boolean = false;
  console.log("Reqyest type: " + req.body.type);
    
  switch(req.body.type) {
    case "Idea": 
      result = await db.MarkIdeaAsResolved(req.body.id);
      break;

    case "Queja":
      result = await db.MarkComplaintAsResolved(req.body.id);
      break;

    case "Sugerencia":
      result = await db.MarkSuggestionAsResolved(req.body.id);
      break;
  }

  console.log("result: " + result);

  if(result) {
    console.log("Sending OK");
    res.status(200).json("OK");
  }
  else {
    console.log("Sensing error");
    res.status(404).json("Internal server error");
  }
});
*/

app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});
