import {Request, Response} from 'express';
import {route, GET, DELETE, PUT, before, POST} from 'awilix-express';
import {authMiddle} from '../middlewares/auth.middleware';
import {VehicleService} from '../services/vehicle.service';
import {
    vehiclesCreateValidationMiddleware,
} from "../middlewares/validation/vehicle.validation.middleware";
import {getJwtPayload} from "../utils/jwt";
import {CustomError} from "../models/custom-error.model";


/**
 * @swagger
 * tags:
 *  name: Vehicle
 *  description: Vehicle endpoint
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Vehicle:
 *      type: object
 *      properties:
 *         _id:
 *           type: string
 *           description: Id vehicle
 *           example: 62bda4e99f89d9b25888e58b
 *         brand:
 *           type: string
 *           description: brand vehicle
 *         model:
 *           type: string
 *           description: model vehicle
 *         color:
 *           type: string
 *           description: color vehicle
 *         dateAdmission:
 *           type: string
 *           description: date of Admission vehicle
 *           format: date
 *         assigned:
 *           type: string
 *           description: assigned vehicle
 *         state:
 *            type: boolean
 *            description: State of vehicle
 *  parameters:
 *    id:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the vehicle
 *    data:
 *      in: path
 *      name: data
 *      required: true
 *      schema:
 *        type: string
 *      description: data filter vehicle
 */

@route('/vehicles')
export default class VehicleController {
    constructor(public readonly vehicleService: VehicleService) {
    }

    /**
     * @swagger
     * components:
     *      schemas:
     *          newVehicle:
     *              type: object
     *              properties:
     *                  brand:
     *                      type: string
     *                      description: brand vehicle
     *                  model:
     *                      type: string
     *                      description: model vehicle
     *                  color:
     *                      type: string
     *                      description: color vehicle
     *                  assigned:
     *                      type: string
     *                      description: assigned vehicle
     */

    /**
     * @swagger
     * /vehicles/newvehicle:
     *  post:
     *    tags:
     *      - Vehicle
     *    summary: create vehicle
     *    description: new vehicle
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *              $ref: '#/components/schemas/newVehicle'
     *    responses:
     *      200:
     *        description: successful operation
     *        content:
     *          application/json:
     *              schema:
     *                  $ref: '#/components/schemas/Vehicle'
     *      400:
     *        description: invalid input
     *        content:
     *          application/json:
     *              schema:
     *                  $ref: '#/components/schemas/InvalidInput'
     */

    @route("/newvehicle")
    @POST()
    @before([vehiclesCreateValidationMiddleware])
    public async createVehicle(req: Request, res: Response) {
        const payload = await getJwtPayload(req);
        const {body} = req;
        const createdUser = await this.vehicleService.createVehicle(payload.user.id, body);
        res.sendSuccessful(createdUser, "Vehicle Created");
    }

    /**
     * @swagger
     * components:
     *   schemas:
     *    VehiclesAll:
     *      type: object
     *      properties:
     *         users:
     *           type: array
     *           items:
     *              '$ref': '#/components/schemas/Vehicle'
     *         elements:
     *           type: number
     *         pageSize:
     *           type: number
     *           example: 10
     *         pageNum:
     *           type: number
     *           example: 10
     */

    /**
     * @swagger
     * components:
     *   schemas:
     *     VehiclesAllFin:
     *       type: object
     *       properties:
     *          data:
     *             '$ref': '#/components/schemas/VehiclesAll'
     *          message:
     *             type: string
     *             description: message
     */

    /**
     * @swagger
     * /vehicles:
     *  get:
     *    summary: getAllVehicle Vehicles
     *    tags:
     *      - Vehicle
     *    header:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Token'
     *    responses:
     *      200:
     *        description: successful operation
     *        content:
     *          application/json:
     *            schema:
     *                  '$ref': '#/components/schemas/VehiclesAllFin'
     *      401:
     *        description: invalid input
     *        content:
     *          application/json:
     *            schema:
     *                  '$ref': '#/components/schemas/InvalidInput'
     */
    @route('')
    @GET()
    @before([authMiddle])
    public async getAllVehicle(req: Request, res: Response) {
        const {pageSize, pageNum} = req.query;
        let size: number = Number(pageSize);
        let num: number = Number(pageNum);
        await this.vehicleService.getAllVehicle(size, num).then((vehicles) => {
            if (!vehicles) {
                throw new CustomError("No Vehicles found.", 401);
            } else {
                return res.sendSuccessful(vehicles, "Vehicle successfully.", 200);
            }
        })
    }

    /**
     * @swagger
     * components:
     *   schemas:
     *      VehiclesFin:
     *          type: object
     *          properties:
     *              data:
     *                  $ref: '#/components/schemas/Vehicle'
     *              message:
     *                  type: string
     *                  description: message
     */

    /**
     * @swagger
     * /vehicles/{id}:
     *  get:
     *    summary: getVehicle by Id
     *    tags:
     *      - Vehicle
     *    parameters:
     *      - '$ref': '#/components/parameters/id'
     *    header:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *              '$ref': '#/components/schemas/Token'
     *    responses:
     *      200:
     *        description: successful operation
     *        content:
     *          application/json:
     *            schema:
     *                  '$ref': '#/components/schemas/VehiclesFin'
     *      401:
     *        description: invalid input
     *        content:
     *          application/json:
     *            schema:
     *                  '$ref': '#/components/schemas/InvalidInput'
     */
    @route('/search/:data')
    @GET()
    @before([authMiddle])
    public async getFilterVehicle(req: Request, res: Response) {
        const {data} = req.params;
        await this.vehicleService.getFilterVehicle(data).then((vehicle) => {
            if (!vehicle) {
                throw new CustomError("No vehicle found.", 401);
            } else {
                return res.sendSuccessful(vehicle, "Vehicle successfully.", 200);
            }
        })
    }

    /**
     * @swagger
     * components:
     *   schemas:
     *      VehiclesFin:
     *          type: object
     *          properties:
     *              data:
     *                  $ref: '#/components/schemas/Vehicle'
     *              message:
     *                  type: string
     *                  description: message
     */

    /**
     * @swagger
     * /vehicles/{id}:
     *  get:
     *    summary: getVehicle by Id
     *    tags:
     *      - Vehicle
     *    parameters:
     *      - '$ref': '#/components/parameters/id'
     *    header:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *              '$ref': '#/components/schemas/Token'
     *    responses:
     *      200:
     *        description: successful operation
     *        content:
     *          application/json:
     *            schema:
     *                  '$ref': '#/components/schemas/VehiclesFin'
     *      401:
     *        description: invalid input
     *        content:
     *          application/json:
     *            schema:
     *                  '$ref': '#/components/schemas/InvalidInput'
     */
    @route('/:id')
    @GET()
    @before([authMiddle])
    public async getVehicle(req: Request, res: Response) {
        const {id} = req.params;
        await this.vehicleService.getVehicle(id).then((vehicle) => {
            if (!vehicle) {
                throw new CustomError("No vehicle found.", 401);
            } else {
                return res.sendSuccessful(vehicle, "Vehicle successfully.", 200);
            }
        })
    }

    /**
     * @swagger
     * /vehicles/{id}:
     *  put:
     *    summary: Update vehicle
     *    tags:
     *      - Vehicle
     *    parameters:
     *      - '$ref': '#/components/parameters/id'
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *              '$ref': '#/components/schemas/VehiclePut'
     *    responses:
     *      200:
     *        description: successful operation
     *        content:
     *          application/json:
     *            schema:
     *                  '$ref': '#/components/schemas/VehiclesPutFin'
     *      400:
     *        description: invalid input
     *        content:
     *          application/json:
     *            schema:
     *                  '$ref': '#/components/schemas/InvalidInput'
     */

    /**
     * @swagger
     * components:
     *   schemas:
     *      VehiclesPutFin:
     *          type: object
     *          properties:
     *              data:
     *                  '$ref': '#/components/schemas/Vehicle'
     *              message:
     *                  type: string
     *                  description: Vehicle updated successfully.
     *                  example: Vehicle updated successfully.
     */

    /**
     * @swagger
     * components:
     *   schemas:
     *      VehiclePut:
     *          type: object
     *          properties:
     *              brand:
     *                  type: string
     *                  description: vehicle brand
     *              model:
     *                  type: string
     *                  description: model vehicle
     *              color:
     *                  type: string
     *                  description: color vehicle
     *              dateAdmission:
     *                  type: string
     *                  description: dateAdmission vehicle
     *                  format: date
     *              assigned:
     *                  type: string
     *                  description: assigned vehicle
     *              state:
     *                  type: boolean
     *                  description: state vehicle
     */

    @route('/:id')
    @PUT()
    @before([authMiddle])
    public async updateVehicle(req: Request, res: Response): Promise<void> {
        let userData = req.body;
        const {id} = req.params;
        const reult = await this.vehicleService.updateVehicle(id, userData)
        return res.sendSuccessful(reult, "Vehicle updated successfully.", 200);
    }

    /**
     * @swagger
     * /vehicles/{id}:
     *  delete:
     *    summary: Delete vehicle
     *    tags:
     *      - Vehicle
     *    parameters:
     *      - '$ref': '#/components/parameters/id'
     *    responses:
     *      200:
     *        description: successful operation
     *        content:
     *          application/json:
     *            schema:
     *                  '$ref': '#/components/schemas/VehiclesDeleteFin'
     *      400:
     *        description: invalid input
     *        content:
     *          application/json:
     *            schema:
     *                  '$ref': '#/components/schemas/InvalidInput'
     */

    /**
     * @swagger
     * components:
     *   schemas:
     *      VehiclesDeleteFin:
     *          type: object
     *          properties:
     *              data:
     *                  type: object
     *                  example: null
     *              message:
     *                  type: string
     *                  description: Vehicle has been successfully removed.
     *                  example: Vehicle has been successfully removed.
     */

    @route('/:id')
    @DELETE()
    @before([authMiddle])
    //eliminar vehicle
    public async delete(req: Request, res: Response) {
        const payload = await getJwtPayload(req);
        const {id} = req.params;
        await this.vehicleService.deleteVehicle(payload.user.id, id).then((vehicle) => {
            if (!vehicle) {
                throw new CustomError("No vehicle found.", 401);
            } else {
                return res.sendSuccessful(null, "Vehicle has been successfully removed.", 200);
            }
        });
    }
}
