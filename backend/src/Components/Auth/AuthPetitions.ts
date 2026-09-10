import { Router, Request, Response } from "express";
import Database from "../Database";
import { auth } from "./InnerAuthValidator";
import JWT_Manager from "./JWT_Manager";
import { Secrets } from "./../../../keys";
import bcrypt from "bcrypt";

let db: Database = new Database();
const secrets:Secrets = new Secrets();
const AuthRouter = Router();

AuthRouter.get("/amIPrivileged", async (req: Request, res: Response) => {
  console.log("Received new request for info on wether the user is privileged");
  
  const authed = auth(req);
  if (authed > 1) {
    console.log("sending OK");
    res.status(200).json({ result: "OK" });
  }
  else {
    res.status(401).json({ result: "PROHIBITED" });
  }
});

AuthRouter.get('/amIAdmin', async (req: Request, res: Response) => {
  console.log("Received new request for info on wether the user is admin");

  const authed = auth(req);
  if(authed > 1) {
    const result = await db.CheckAdmin(authed);

    if (result) {
      res.status(200).json({ result: "OK"});
    }
    else {
      res.status(401).json({ result: "PROHIBITED"});
    }
  }
  else {
    res.status(401).json({ result: "PROHIBITED"});
  }
});

AuthRouter.post("/adminLogin", async(req: Request, res: Response) => {
  console.log("recieved new login wanted: " + req.body.user + "; password: " + req.body.password);

  const loginCorrect:number = await tryToLogIn(req.body.user, req.body.password);

  if(loginCorrect > 1) {
    await db.AddLog(loginCorrect, req.ip || "", "Logged in correctly");

    const token = JWT_Manager.createToken(loginCorrect); //TODO: Change token ID to correct ID
    console.log(token);

    console.log("Created token: " + token);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', //ONly sent over https in production
    })

    res.status(200).json({result: "OK"});
  }
  else {
    await db.AddLog(loginCorrect, req.ip || "", "Failed to log in with user: " + req.body.user);
    res.status(401).send({result: "Forbidden"});
  }
});

AuthRouter.get("/adminlogout", async(req:Request, res:Response) => {
  console.log("Received new logout");

  const user = auth(req);
  if(user > 1) {
    try{
      res.clearCookie('token', {httpOnly: true});
      await db.AddLog(user, req.ip || "", "Logged out correctly");

      res.status(200).send({status:"OK"});
    }
    catch(e) {
      await db.AddLog(user, req.ip || "", "Error while trying to log out");
      res.status(500).send({status:"ERROR"});
    }
  }
  else {
    await db.AddLog(user, req.ip || "", "Tried to log out without being logged in");
    res.status(401).send({status:"No Token"});
  }
});

AuthRouter.get("/timeLeft", async(req:Request, res:Response) => {
  const token = req.cookies.token;

  if(!token) {
    res.status(404).send({Reason:"No token found"});
  }
  else {
    try {
      const decoded = JWT_Manager.readToken(token);
      if(token != null) {
        const remainingMs = (decoded.exp * 1000) - Date.now();

        if(remainingMs < 5000) { // 5 seconds of margin
          const newToken = JWT_Manager.createToken(token.id); //TODO: Change token ID to correct ID

          console.log("Created token to replace: " + newToken);

          res.cookie('token', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', //ONly sent over https in production
          })

          res.status(200).json({status: "Renewed"});
        }
      } 
      else {
        res.status(401).send({Reason:"Corrupted token"});
      }
    }
    catch(exception) {
      res.status(401).send({Reason:"Corrupted token"});
    }
  }
});

const tryToLogIn = async(user:string, password:string):Promise<number> => {
  const info = await db.GetUserInfo(user);

  if(info != null) {
    const match = await bcrypt.compare(password, info.hashedPassword);

    console.log(match);

    if(!match) {
      return 1;
    }
    else {
      return info.userId;
    }
  }
  else {
    return 1;
  }
}

export default AuthRouter;