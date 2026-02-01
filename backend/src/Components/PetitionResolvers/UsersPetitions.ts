import { Router, Request, Response } from "express";
import Database from "../Database";
import AllowedUserData from "src/Interfaces/AllowedUserData";

let db: Database = new Database();
const UsersRouter = Router();


UsersRouter.get("/info", async (req: Request, res: Response) => {
  console.log("Received new request for user info of the privileged ones", req.body);
  //TODO: Handle the retrieval of privileged user info

  const users:AllowedUserData[] = [
    {"name": "Juan", "surname": "Pérez", "permission": "admin"},
    {"name": "María", "surname": "García", "permission": "overseer"},
    {"name": "Luis", "surname": "López", "permission": "overseer"},
    {"name": "Ana", "surname": "Martínez", "permission": "admin"},
    {"name": "Carlos", "surname": "Rodríguez", "permission": "overseer"},
    {"name": "Elena", "surname": "Sánchez", "permission": "overseer"},
    {"name": "Miguel", "surname": "Fernández", "permission": "overseer"},
    {"name": "Laura", "surname": "Gómez", "permission": "admin"}
  ]; 
  res.status(200).json(users);
});

UsersRouter.post("/setAdmin", async (req: Request, res: Response) => {
  console.log("Received new request to set a user as admin of the site", req.body);
  //TODO: Handle the setting of a user as admin
  res.status(200);
});

UsersRouter.post("/removePrivileges", async (req: Request, res: Response) => {
  console.log("Received new request to remove user privileges", req.body);
  //TODO: Handle the removal of user privileges
  res.status(200);
});

UsersRouter.post("/resetSelfPrivileges", async (req: Request, res: Response) => {
  console.log("Received new request to reset user privileges", req.body);
  //TODO: Handle the resetting of user privileges
  res.status(200);
});

UsersRouter.post("/getUsersByName", async (req: Request, res: Response) => {
  console.log("Received new request to get users by name", req.body);
  //TODO: Handle the retrieval of possible users by name
  res.status(200);
});

UsersRouter.post("/givePrivileges", async (req: Request, res: Response) => {
  console.log("Received new request to give a new user privileges", req.body);
  //TODO: Handle the granting of privileges to a user
  res.status(200);
});



export default UsersRouter;