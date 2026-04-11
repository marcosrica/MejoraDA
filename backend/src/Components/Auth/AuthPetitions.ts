import { Router, Request, Response } from "express";
import Database from "../Database";
import { IsAdmin, IsPrivileged } from "./InnerAuthValidator";

let db: Database = new Database();
const AuthRouter = Router();


AuthRouter.get("/amIPrivileged", async (req: Request, res: Response) => {
  console.log("Received new request for info on wether the user is privileged");
  
  const isPrivileged = IsPrivileged(req.headers.authorization || "");
  console.log("Privileged: " + isPrivileged);
  if(isPrivileged) {
    console.log("sending OK")
    res.status(200).json({ result: "OK"});
  }
  else {
    res.status(401).json({ result: "PROHIBITED"});
  }
});

AuthRouter.get("/amIAdmin", async (req: Request, res: Response) => {
  console.log("Received new request for info on wether the user is admin");
  
  const isAdmin = IsAdmin(req.headers.authorization || "");
  if(isAdmin) {
    res.status(200).json({ result: "OK"});
  }
  else {
    res.status(401).json({ result: "PROHIBITED"});
  }
});



export default AuthRouter;