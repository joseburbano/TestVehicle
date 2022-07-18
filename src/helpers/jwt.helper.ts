import {UserToEncodeDto} from "../dto/user/userToEncode.dto";
import dotenv from "dotenv";
import {sign} from 'jsonwebtoken';

dotenv.config({
    path: `${__dirname}/../../.env`
});

const JWT_SECRET: string = process.env.JWT_SECRET;

export const generateToken = function (user: UserToEncodeDto) {
    return sign({user}, JWT_SECRET, {expiresIn: "24h"});
};
