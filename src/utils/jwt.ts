import {Request} from "express";
import {decode} from "jsonwebtoken";


interface User {
    id: string,
    name: string,
    identifier: string,
    telephone: number,
    email: string,
    potentialAction: Array<string>
  }

interface Payload {
    user: User,
    iat:number,
    exp:number
  }


const getJwtPayload = async (req: Request) : Promise<Payload>=> {
    const token = req.headers["authorization"];
    return decode(token.replace("Bearer ", "")) as Payload;
  };

export { getJwtPayload };
