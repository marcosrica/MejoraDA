import JWT_Manager from "./JWT_Manager";

export function IsAdmin(token: any): boolean {
    const decodedToken = JWT_Manager.readToken(token);
    console.log(decodedToken);
    return true;
}

export function IsPrivileged(token: string): boolean {
    const decodedToken = JWT_Manager.readToken(token);
    console.log(decodedToken);
    return true;
}