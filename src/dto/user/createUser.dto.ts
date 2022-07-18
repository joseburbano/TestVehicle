// 1. Create an interface representing a document in MongoDB.

export interface CreateUserDto {
    _id: any,
    name: string;
    userName: string;
    identifier: string;
    telephone: number;
    email: string;
    password: string;
    dateCreate: Date;
    userUpdate: Date;
    birthDate: Date;
    gender: string;
    nationality: string;
    potentialAction: Array<string>;
    active: boolean;
}
