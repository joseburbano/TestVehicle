import {VehicleFullDto} from "./vehicleFull.dto";

export interface VehiclesAll {
    vehicles: Array<VehicleFullDto>;
    elements: number;
    pageSize: number;
    pageNum: number
}
