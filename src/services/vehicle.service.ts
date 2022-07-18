import {VehicleFullDto} from '../dto/vehicle/vehicleFull.dto'
import {CreateVehicleDto} from '../dto/vehicle/createVehicle.dto'
import {VehicleRepository} from '../repositories/vehicle.repository'
import {CustomError} from "../models/custom-error.model";
import {VehiclesAll} from "../dto/vehicle/vehiclesAll";
import {VehicleDto} from "../dto/vehicle/vehicle.dto";
import {UserRepository} from "../repositories/user.repository";
import {UserDto} from "../dto/user/user.dto";


export interface VehicleService {
    getAllVehicle(size: number | null, num: number | null): Promise<VehicleDto | any>;

    getFilterVehicle(data: string | null): Promise<Array<VehicleFullDto> | null>;

    getVehicle(id: string | null): Promise<VehicleFullDto | null>;

    createVehicle(id: string, vehicle: CreateVehicleDto | null): Promise<VehicleFullDto | null>;

    updateVehicle(id: string, vehicleData: VehicleDto | null): Promise<VehicleDto | null>;

    deleteVehicle(id: string, vehicleIdentifier: string | null): Promise<boolean | null>;
}

export class VehicleServices implements VehicleService {
    constructor(public readonly vehicleRepository: VehicleRepository, public readonly userRepository: UserRepository) {
    }

    async getAllVehicle(size: number | null, num: number | null): Promise<VehiclesAll | any> {

        return await this.vehicleRepository.getAllVehicle(size, num);
    }

    async createVehicle(id: string, vehicle: CreateVehicleDto | null): Promise<VehicleFullDto | null> {
        //We verify that the user exists in the database
        const currentEntity: UserDto = await this.userRepository.getRolUser(id, 'admin');

        if (!currentEntity) {
            throw new CustomError('User not exists', 400, 'entity does not found or user does not have admin role.');
        }
        let vehicleNew: VehicleDto = {
            brand: vehicle.brand,
            model: vehicle.model,
            color: vehicle.color,
            dateAdmission: new Date(),
            assigned: vehicle.assigned,
            potentialAction: ["consumer"],
            state: true,
        }

        return await this.vehicleRepository.createVehicle(vehicleNew);
    }

    async getFilterVehicle(data: string): Promise<Array<VehicleFullDto> | null> {

        let dataFull =  await this.vehicleRepository.getFilterVehicle(data);

        console.log(dataFull);
        if (dataFull.length > 0) {
            return  dataFull;
        } else{
            throw new CustomError('No date found.', 400, 'No date found register db.');
        }
    }

    async getVehicle(id: string): Promise<VehicleFullDto | null> {

        let dataFull =  await this.vehicleRepository.getVehicle(id);

        if (!dataFull) {
            throw new CustomError('No date found.', 400, 'No date found register db.');
        } else{
            return dataFull
        }
    }

    //update vehicle
    async updateVehicle(id: string | null, vehicleData: VehicleDto | null): Promise<VehicleFullDto | null> {
        if (!id) {
            throw new CustomError('Identifier is required.', 400, 'Please verify that you send the id.');
        }

        //We verify that the vehicle exists in the database
        const currentEntity: VehicleDto = await this.vehicleRepository.getVehicle(id);
        if (!currentEntity) {
            throw new CustomError('Vehicle not exists', 400, 'entity does not found.');
        }

        if (vehicleData.brand) {
            currentEntity.brand = vehicleData.brand;
        }
        if (vehicleData.model) {
            currentEntity.model = vehicleData.model;
        }
        if (vehicleData.color) {
            currentEntity.color = vehicleData.color;
        }
        if (vehicleData.dateAdmission) {
            currentEntity.dateAdmission = vehicleData.dateAdmission;
        }
        if (vehicleData.assigned) {
            currentEntity.assigned = vehicleData.assigned;
        }
        if (vehicleData.state) {
            currentEntity.state = vehicleData.state;
        }
        //we return true when everything goes well
        return await this.vehicleRepository.updateVehicle(id, currentEntity);
    }

    //delete vehicle
    async deleteVehicle(id: string, vehicleIdentifier: string): Promise<boolean | null> {

        //we verify that it contains data in the variable vehicleIdentifier
        if (!vehicleIdentifier) {
            throw new CustomError('Error id vehicle', 400, 'Identifier must be sent.');
        }

        //We verify that the user exists in the database and rol admin
        const userAdmin: UserDto = await this.userRepository.getRolUser(id, "admin");
        if (!userAdmin) {
            throw new CustomError('User not exists', 400, 'entity does not found or user does not have admin role.');
        }

        //We verify that the vehicle exists in the database
        const currentEntity = await this.vehicleRepository.getVehicle(vehicleIdentifier);
        if (!currentEntity) {
            throw new CustomError('Vehicle not exists', 400, 'entity does not found.');
        }

        return await this.vehicleRepository.deleteVehicle(vehicleIdentifier);
    }
}

