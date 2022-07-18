// 1. Create an interface representing a document in MongoDB.

export interface VehicleDto {
    brand: string;
    model: string;
    color: string;
    dateAdmission: Date;
    assigned: string;
    potentialAction: Array<string>
    state: boolean;
}
