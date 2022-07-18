import {UserToEncodeDto}from './userToEncode.dto';
export interface UserLoginDto {
    readonly user: UserToEncodeDto;
    readonly token: string;
}
