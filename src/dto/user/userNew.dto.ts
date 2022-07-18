export interface UserNewDto {
    readonly name: string;
    readonly userName: string;
    readonly identifier: string;
    readonly telephone: number;
    readonly email: string;
    readonly birthDate: Date;
    readonly gender: string;
    readonly password: string;
    readonly repeatPassword: string;
}
