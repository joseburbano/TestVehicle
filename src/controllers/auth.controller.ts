import {Request, Response} from "express";
import {route, POST, before, GET} from "awilix-express";
import {AuthService} from "../services/auth.service";
//middlewares
import {
    authSignUpValidationMiddleware,
    authSignInValidationMiddleware,
} from "../middlewares/validation/auth.validation.middleware";

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth endpoints
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *         _id:
 *           type: string
 *           description: Id user
 *           example: 62bda4e99f89d9b25888e58b
 *         name:
 *           type: string
 *           description: Name user
 *         userName:
 *           type: string
 *           description: Username user
 *         identifier:
 *           type: string
 *           description: Identifier user
 *         telephone:
 *           type: string
 *           description: Telephone user
 *         email:
 *           type: string
 *           description: Email user
 *         dateCreate:
 *           type: string
 *           description: Date create user
 *           format: date
 *         userUpdate:
 *           type: string
 *           description: User update user
 *           format: date
 *         birthDate:
 *           type: string
 *           description: Birthdate user
 *           format: date
 *         gender:
 *           type: string
 *           description: Gender user
 *         nationality:
 *           type: string
 *           description: Nationality user
 *         potentialAction:
 *           type: string
 *           description: potentialAction user
 *         active:
 *           type: boolean
 *           description: Nationality user
 */

@route("/auth")
export class AuthController {
    constructor(public readonly authService: AuthService) {
    }

    /**
     * @swagger
     * components:
     *      schemas:
     *          SignUp:
     *              type: object
     *              properties:
     *                  name:
     *                      type: string
     *                      description: name user
     *                  userName:
     *                      type: string
     *                      description: surname user
     *                  identifier:
     *                      type: string
     *                      description: identifier user
     *                  telephone:
     *                      type: string
     *                      description: telephone user
     *                  email:
     *                      type: string
     *                      description: email user
     *                  birthDate:
     *                      type: string
     *                      description: birthDate user
     *                      format: date
     *                      example: 1995-03-23T18:30:00.000Z
     *                  gender:
     *                      type: string
     *                      description: gender user
     *                  password:
     *                      type: string
     *                      description: password user
     *                  repeatPassword:
     *                      type: string
     *                      description: repeatPassword user
     */

    /**
     * @swagger
     * /auth/signup:
     *  post:
     *    tags:
     *      - Auth
     *    summary: signup user
     *    description: new user
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *              $ref: '#/components/schemas/SignUp'
     *    responses:
     *      200:
     *        description: successful operation
     *        content:
     *          application/json:
     *              schema:
     *                  $ref: '#/components/schemas/User'
     *      400:
     *        description: invalid input
     *        content:
     *          application/json:
     *              schema:
     *                  $ref: '#/components/schemas/InvalidInput'
     */

    @route("/signup")
    @POST()
    @before([authSignUpValidationMiddleware])
    public async signUp(req: Request, res: Response) {
        const {body} = req;
        const createdUser = await this.authService.signUp(body);
        res.sendSuccessful(createdUser, "User Created");
    }

    /**
     * @swagger
     *  components:
     *   schemas:
     *     SignIn:
     *        type: object
     *        properties:
     *          email:
     *              type: string
     *              description: user email
     *              example: example@example.com
     *          password:
     *              type: string
     *              description: password
     *              example: example123456
     */


    /**
     * @swagger
     *  components:
     *   schemas:
     *    InvalidInput:
     *      type: object
     *      properties:
     *        message:
     *          type: string
     *          description: message description
     *        status:
     *          type: integer
     *          description: http status code
     *          example: 400
     *        additionalInfo:
     *          type: string
     *          description: errors group
     *          example: Err ....
     */

    /**
     * @swagger
     * /auth/signin:
     *  post:
     *    tags:
     *      - Auth
     *    summary: sign user
     *    description: new user
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *                 '$ref': '#/components/schemas/SignIn'
     *    responses:
     *      200:
     *        description: successful operation
     *        content:
     *          application/json:
     *              schema:
     *                  '$ref': '#/components/schemas/UserToken'
     *      400:
     *        description: invalid input
     *        content:
     *          application/json:
     *            schema:
     *                  '$ref': '#/components/schemas/InvalidInput'
     *
     */
    @route("/signin")
    @POST()
    @before([authSignInValidationMiddleware])
    public async signIn(req: Request, res: Response) {
        const {body} = req;

        const creds = await this.authService.signIn(body);
        const {user, token} = creds;
        return res.sendSuccessful({user: user, token: token});
    }
}
