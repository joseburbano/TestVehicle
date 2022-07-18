import {CreateUserDto} from "./createUser.dto";

export interface UsersAll {
    users: Array<CreateUserDto>;
    elements: number;
    pageSize: number;
    pageNum: number
}
