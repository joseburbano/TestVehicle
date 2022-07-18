import {Request, Response, NextFunction} from "express";

export function extendedResponse(
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.sendSuccessful = function (
        data: null,
        message: null | "successful",
        status: number | null = 200
    ) {
        res.statusCode = status;

        if (message) return res.json({message,  data : data });

        res.json({data:data});
    };
    next();
}
