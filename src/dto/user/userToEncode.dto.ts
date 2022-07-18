export interface UserToEncodeDto {
    readonly id: string;
    readonly name: string;
    readonly identifier: string;
    readonly telephone: number;
    readonly email: string;
    potentialAction: Array<string>;
}
