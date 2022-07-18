// 1. Create an interface representing a document in MongoDB.

export interface UserUpdateDto {
    readonly name: string;
    readonly userName: string;
    readonly identifier: string;
    readonly telephone: number;
    readonly email: string;
    readonly birthDate: Date;
    readonly gender: string;
    readonly nationality: string;
    readonly active: boolean;
}
