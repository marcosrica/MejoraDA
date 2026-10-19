import { Router, Request, Response } from "express";
import Database from "../Database";
import AllowedUserData from "src/Interfaces/AllowedUserData";
import { auth } from "../Auth/InnerAuthValidator";
import bcrypt from 'bcrypt';
import { Secrets } from "./../../../keys";

let db: Database = new Database();
const UsersRouter = Router();
const secrets:Secrets = new Secrets();

//Route that will return all the allowed users present in the service,
//Their data will be mapped, including their username, permission level, and id inside the db 
UsersRouter.get("/info", async (req: Request, res: Response) => {
  console.log("Received new request for user info of the privileged ones", req.body);

  //Creating empty array to later populate with the users from the db
  const users: AllowedUserData[] = [];

  //Retrieving all the users from the db
  const response = await db.GetUsers();
  
  for (let i = 0; i < response.length; i++) {
    //Filtering out the empty user from the db
    if (response[i].username != "Unsigned") {
      users.push({ id: response[i].id, name: response[i].username, permission: response[i].admin });
    }
  }

  //Returning the filtered users
  res.status(200).json(users);
});

//Route that will create a new allowed user inside the database, given a username and password
UsersRouter.post("/addUser", async (req: Request, res: Response) => {
  //Hasing the password before sending it to the db
  const password = await bcrypt.hash(req.body.password, secrets.SaltRounds);
  //Sending the data to the database for the user to be created
  const response = await db.AddUser(req.body.username, password);
  return res.status(200).json({ result: "OK" });
});

UsersRouter.post("/removeUser", async (req: Request, res: Response) => {
  console.log("Trying to remove the user with ID: ", req.body);
  const response = await db.RemoveUser(req.body.id);
  return res.status(200).json({ result: "OK" });
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