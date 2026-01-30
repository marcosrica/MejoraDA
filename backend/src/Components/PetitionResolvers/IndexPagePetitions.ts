import { Router, Request, Response } from "express";
import Database from "../Database";

let db: Database = new Database();
const IndexPageRouter = Router();

// Matches: /api/index/foo
IndexPageRouter.get("/getTotalForms", async (req: Request, res: Response) => {
  const [complaints, ideas, suggestions] = await Promise.all([
      db.RetrieveComplaints("All", true),
      db.RetrieveIdeas("All", true),
      db.RetrieveSuggestions("All", true),
  ]);

  const count = complaints.length + ideas.length + suggestions.length;
  console.log(count + "is the amount of petitions");

  res.status(200).json({count});
});

IndexPageRouter.get("/getFormsBreakdown", async (req: Request, res: Response) => {
  const [complaints, ideas, suggestions] = await Promise.all([
      db.RetrieveComplaints("All", true),
      db.RetrieveIdeas("All", true),
      db.RetrieveSuggestions("All", true),
  ]);

  res.status(200).json({ complaints: complaints.length, ideas: ideas.length, suggestions: suggestions.length });
});

export default IndexPageRouter;