// 1. Create an interface representing a document in MongoDB.

export interface VehicleFullDto {
    _id: any,
    brand: string;
    model: string;
    color: string;
    dateAdmission: Date;
    assigned: string;
    potentialAction: Array<string>
    state: boolean;
}
