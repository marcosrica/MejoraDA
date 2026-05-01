import JWT_Manager from "./JWT_Manager";
import {Request} from "express";

export function isPrivileged(token: any): string {
    const decodedToken = JWT_Manager.readToken(token);
    console.log(decodedToken);
    if(decodedToken != null) {
        try {
            return decodedToken.id;
        }
        catch {
            return "";
        }
    }
    else {
        return "";
    }
}

export function auth(req: Request):string {
    const token = req.cookies.token;

    return isPrivileged(token);
}