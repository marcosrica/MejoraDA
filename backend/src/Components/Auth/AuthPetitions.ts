import { Router, Request, Response } from "express";
import Database from "../Database";
import { IsAdmin, IsPrivileged } from "./InnerAuthValidator";
import JWT_Manager from "./JWT_Manager";

let db: Database = new Database();
const AuthRouter = Router();

AuthRouter.get("/amIPrivileged", async (req: Request, res: Response) => {
  console.log("Received new request for info on wether the user is privileged");
  
  const token = req.cookies.token;   
  console.log("TOken recieved: " + token)
  const isPrivileged = IsPrivileged(token || "");
  console.log("Privileged: " + isPrivileged);
  if(isPrivileged) {
    console.log("sending OK")
    res.status(200).json({ result: "OK"});
  }
  else {
    res.status(401).json({ result: "PROHIBITED"});
  }
});

AuthRouter.post("/adminLogin", async(req: Request, res: Response) => {
  console.log("recieved new login wanted: " + req.body.user + "; password: " + req.body.password);

  //TODO: Handle login and status
  const loginCorrect: boolean = true;

  if(loginCorrect) {
    //TODO: Log the user correctly logging in
    const token = JWT_Manager.createToken(99); //TODO: Change token ID to correct ID

    console.log("Created token: " + token);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', //ONly sent over https in production
    })

    res.status(200).json({result: "OK"});
  }
  else {
    //TODO: Log the login fail (IP adress + user and password for trying to log in)
    res.status(401).send({result: "Forbidden"});
  }
});

AuthRouter.get("/adminlogout", async(req:Request, res:Response) => {
  console.log("Received new logout");

  try{
    res.clearCookie('token', {httpOnly: true});

    res.status(200).send({status:"OK"});
  }
  catch(e) {
    res.status(500).send({status:"ERROR"});
  }
});

export default AuthRouter;