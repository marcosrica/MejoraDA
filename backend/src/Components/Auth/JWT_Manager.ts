import { Secrets } from "../../../keys";

const jwt = require('jsonwebtoken');

const secrets:Secrets = new Secrets();

const createToken = (id:number) => {
  return jwt.sign({id: id}, secrets.JWT_Secret, {expiresIn: secrets.JWT_Timeout});
}

const readToken = (token:any): any => {
  if(!token) { return null; }

  try {
    const decoded = jwt.verify(token, secrets.JWT_Secret);
    return decoded;
  }
  catch(err) {
    return null;
  }
}

export default {createToken, readToken};