import JWT_Manager from "./JWT_Manager";
import {Request} from "express";

export function isPrivileged(token: any):number {
  const decodedToken = JWT_Manager.readToken(token);
  console.log(decodedToken);
  if(decodedToken != null) {
    try {
      return decodedToken.id;
    }
    catch {
      return 1;
    }
  }
  else {
    return 1;
  }
}

export function auth(req: Request):number {
  const token = req.cookies.token;

  return isPrivileged(token);
}