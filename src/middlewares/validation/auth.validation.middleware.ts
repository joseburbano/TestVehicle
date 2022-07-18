import {Request, Response, NextFunction} from "express";
import {check, validationResult} from "express-validator";
import {errorConstruction} from './fewerValidationErrors';
import {CustomError} from "../../models/custom-error.model";

// @ts-ignore
export const authSignUpValidationMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await check("name", "Name is required.")
        .not()
        .isEmpty().isLength({min: 3, max: 60}).run(req)
    await check("userName", "User Name is required.")
        .not()
        .isEmpty().isLength({min: 3, max: 60}).run(req)
    await check("identifier", "Identifier is required.")
        .not()
        .isEmpty().isLength({min: 3, max: 30}).run(req)
    await check("telephone", "Telephone is required.")
        .not()
        .isEmpty().isLength({min: 3, max: 30}).run(req)
    await check("email", "Please include a valid email.").isEmail().run(req)
    await check("birthDate", "Please include a valid birth date.").not()
        .isEmpty().isLength({min: 3, max: 50}).run(req)
    await check("gender", "Please include a valid gender.").not()
        .isEmpty().isLength({min: 0, max: 1}).run(req)
    await check(
        "password",
        "Please enter a password with 6 or more characters."
    ).isLength({min: 6, max: 50}).run(req)
    await check(
        "repeatPassword",
        "Please enter a repeatPassword with 6 or more characters."
    ).isLength({min: 6, max: 50}).run(req)

    const errorsSignUp = validationResult(req);
    if (!errorsSignUp.isEmpty()) {
        let messageE = errorConstruction(errorsSignUp)
        return next(new CustomError(messageE.message,
            messageE.status,
            messageE.additionalInfo))
    }
    next();
};

// @ts-ignore
export const authSignInValidationMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await check("email")
        .isEmail()
        .withMessage("That email doesn't look right")
        .bail()
        .trim()
        .run(req)

    await check("password")
        .isLength({min: 6, max: 50})
        .withMessage("Password is required")
        .trim().run(req)
    const errorsSignIn = validationResult(req);

    if (!errorsSignIn.isEmpty()) {
        if (!errorsSignIn.isEmpty()) {
            let messageE = errorConstruction(errorsSignIn)
            return next(new CustomError(messageE.message,
                messageE.status,
                messageE.additionalInfo))
        }
    }
    next();
};

