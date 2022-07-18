import {NextFunction, Request, Response} from 'express';

export const notFoundMiddle = async (req: Request, res: Response, next: NextFunction) => {
    await res.status(404).json({
        status: 404,
        message: "Resource not found",
    });
    next()
};
