import {Schema, model, Model} from 'mongoose';
import {CreateUserDto} from '../dto/user/createUser.dto';
import {VehicleDto} from "../dto/vehicle/vehicle.dto";


const vehicleSchema = new Schema<VehicleDto>({
    brand: {type: String, require: true},
    model: {type: String, require: true},
    color: {
        type: String,
        require: true,
    },
    dateAdmission: Date,
    assigned: String,
    state: Boolean
});

export const VehicleModel = model<VehicleDto>("Vehicle", vehicleSchema);
