import {CustomError} from "../models/custom-error.model";

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';
import {verify} from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import dotenv from "dotenv";

dotenv.config({
    path: `${__dirname}/../../config/${process.env.APP_ENV}.env`
});

const JWT_SECRET: string = process.env.JWT_SECRET;

export const authMiddle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers["authorization"];
    if (!token) {
        return next(new CustomError("Token must be sent.",
            401))
    }

    const tokenBasic = token.replace("Bearer ", "")

    verify(tokenBasic, JWT_SECRET, function (err: any, decodedToken: any) {
        try {
            if (err) {
                return next(new CustomError("Invalid token has expired..",
                    401))
            }
            req.headers.user = decodedToken.user;
        } catch (error) {
            return next(new CustomError(error,
                401))
        }
        next();
    });
};
