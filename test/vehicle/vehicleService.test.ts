import {VehicleService} from '../../src/services/vehicle.service';
import {newVehicle, userAdmin, userConsumer} from './constService';
import {VehicleRepository} from "../../src/repositories/vehicle.repository";
import {UserRepository} from "../../src/repositories/user.repository";



let userRepository: UserRepository = new UserRepository();
let vehicleRepository: VehicleRepository = new VehicleRepository();
let service: VehicleService = new VehicleService();

test('add vehicle', () => {

    expect(service.createVehicle(userAdmin, newVehicle)).toBe(newVehicle.color);
    expect(service.createVehicle(userAdmin, newVehicle)).toBe(newVehicle.assigned);
    expect(service.createVehicle(userAdmin, newVehicle)).toBe(newVehicle.model);
    expect(service.createVehicle(userAdmin, newVehicle)).toBe(newVehicle.brand);
});
