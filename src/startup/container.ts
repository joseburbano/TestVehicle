import express from 'express';
import {asClass, createContainer} from 'awilix';
import {scopePerRequest} from 'awilix-express';
//Services
import {AuthServices} from '../services/auth.service';
import {VehicleServices} from '../services/vehicle.service';
//Repository
import {UserRepositoryImpl} from '../repositories/user.repository';
import {VehicleRepositoryImpl} from '../repositories/vehicle.repository';

export default (app: express.Application) => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({


        //SERVICES
        //Vehicle
        vehicleService: asClass(VehicleServices).scoped(),
        //Auth
        authService: asClass(AuthServices).scoped(),


        //REPOSITORY
        //User
        userRepository: asClass(UserRepositoryImpl).scoped(),
        //Vehicle
        vehicleRepository: asClass(VehicleRepositoryImpl).scoped(),

    });

    app.use(scopePerRequest(container));
};
