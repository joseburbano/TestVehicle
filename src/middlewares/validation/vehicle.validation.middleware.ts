import {Request, Response, NextFunction} from "express";
import {check, validationResult} from "express-validator";
import {errorConstruction} from './fewerValidationErrors';

export const vehiclesCreateValidationMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await check("brand", "The vehicle id is necessary to be able to extract it.")
        .not()
        .isEmpty().isLength({min: 3, max: 300}).run(req.body)
    await check("model", "The model vehicle is necessary to be able to extract it.")
        .not()
        .isEmpty().isLength({min: 3, max: 300}).run(req.body)
    await check("color", "The vehicle color id is necessary to be able to extract it.")
        .not()
        .isEmpty().isLength({min: 3, max: 100}).run(req.body)
    await check("assigned", "The vehicle  assigned is necessary to be able to extract it.")
        .not()
        .isEmpty().isLength({min: 3, max: 100}).run(req.body)

    const errorsSignUp = validationResult(req);
    if (!errorsSignUp.isEmpty()) {
        errorConstruction(errorsSignUp);
    }
    next();
};

