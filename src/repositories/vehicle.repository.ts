import {VehicleModel} from "../models/vehicle.model";
import {VehicleDto} from "../dto/vehicle/vehicle.dto";
import {VehicleFullDto} from "../dto/vehicle/vehicleFull.dto";
import {VehiclesAll} from "../dto/vehicle/vehiclesAll";

export interface VehicleRepository {
    getVehicle(id: string): Promise<VehicleFullDto | any>;

    getAllVehicle(size: number | null, num: number | null): Promise<VehiclesAll | any>;

    updateVehicle(id: string | null, vehicleData: VehicleDto | null): Promise<VehicleFullDto | any>;

    createVehicle(vehicle: VehicleDto): Promise<VehicleFullDto | null | any>;

    deleteVehicle(vehicleIdentifier: string): Promise<boolean | any>;

    getFilterVehicle(data: string): Promise<Array<VehicleFullDto> | any>;
}


export class VehicleRepositoryImpl implements VehicleRepository {

    async getAllVehicle(size = 5, num = 1): Promise<VehiclesAll | any> {
        const skips: number = Number(size * (num - 1));
        const doc = await VehicleModel.find().skip(skips).limit(size).exec();
        const element = await VehicleModel.countDocuments().exec();
        return {
            vehicles: doc,
            elements: element,
            pageSize: size,
            pageNum: num
        };
    }

    async getVehicle(id: string): Promise<VehicleFullDto | any> {
        return await VehicleModel.findById(id).exec().then((user) => {
            return user;
        }).catch(err => {
            return err.errors
        });
    }

    async createVehicle(vehicle: VehicleDto): Promise<VehicleFullDto | any> {
        return await VehicleModel.create(vehicle).then((vehicleDc) => {
            return vehicleDc;
        }).catch(err => {
            console.log(err)
            return err.errors
        })
    }

    async updateVehicle(id: string, vehicleData: VehicleDto): Promise<VehicleFullDto | any> {
        return await VehicleModel.findByIdAndUpdate(id, vehicleData, {new: true}).exec();
    }

    //eliminar vehicle
    async deleteVehicle(vehicleIdentifier: string): Promise<boolean> {
        await VehicleModel.findByIdAndRemove(vehicleIdentifier).exec();
        return true
    }

    //Filter vehicle
    async getFilterVehicle(data: string): Promise<Array<VehicleFullDto> | any> {
        return await VehicleModel.find({
            $or: [{model: data}, {assigned: data}, {brand: data}, {color: data}],
            $and: [{state: {$gt: false}}]
        }).exec();
    }
}
