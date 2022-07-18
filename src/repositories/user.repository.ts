import {UserDto} from "../dto/user/user.dto";
import {UserModel} from "../models/user.model";
import {CreateUserDto} from "../dto/user/createUser.dto";
import {UsersAll} from "../dto/user/usersAll";
import {genSaltSync, hashSync} from "bcryptjs";
import {CreateUserTwoDto} from "../dto/user/createUserTwo.dto";

export interface UserRepository {
    getUser(id: string): Promise<UserDto | null>;

    getAllUser(size: number | null, num: number | null): Promise<UsersAll | null>;

    updateUser(id: string | null, userData: UserDto | null): Promise<UserDto | null>;

    createUser(user: CreateUserTwoDto): Promise<CreateUserDto | null | any>;

    deleteUser(userIdentifier: string): Promise<boolean | null>;

    getUserByEmail(email: string): Promise<CreateUserDto | null>;

    getUserIdentifier(identifier: string): Promise<CreateUserDto | null>;

    getIdentifierExists(identifier: string): Promise<Array<UserDto> | null>;

    compararPass(password: string, user: CreateUserDto): Promise<boolean | null>;

    getUserByEmailIdentifier(email: string, identifier: string): Promise<boolean | null>;

    getRolUser(id: string, potentialAction: string): Promise<UserDto | null>;
}


export class UserRepositoryImpl implements UserRepository {

    async getAllUser(size = 5, num = 1): Promise<UsersAll | null> {
        const skips: number = Number(size * (num - 1));
        const doc = await UserModel.find().skip(skips).limit(size).exec();
        const element = await UserModel.countDocuments().exec();
        return {
            users: doc,
            elements: element,
            pageSize: size,
            pageNum: num
        };
    }

    async getUser(id: string): Promise<UserDto | null> {
        return await UserModel.findById(id).exec().then((user) => {
            return user;
        }).catch(err => {
            return err.errors
        });
    }

    async getUserIdentifier(identifier: string): Promise<CreateUserDto | null> {
        return await UserModel.findById(identifier).then((user) => {
            return user;
        }).catch(err => {
            return err.errors
        })
    }

    async getIdentifierExists(identifier: string): Promise<Array<UserDto>> {
        return await UserModel.find({identifier: identifier}).exec()
    }

    async createUser(user: CreateUserTwoDto): Promise<CreateUserDto | null | any> {
        const salt = genSaltSync(10);
        user.password = hashSync(user.password, salt);
        return await UserModel.create(user).then((userDc) => {
            return userDc;
        }).catch(err => {
            console.log(err)
            return err.errors
        })
    }

    async updateUser(id: string, userData: UserDto): Promise<UserDto> {
        return await UserModel.findByIdAndUpdate(id, userData, {new: true}).exec();
    }


    //eliminar usuario
    async deleteUser(userIdentifier: string): Promise<boolean> {
        await UserModel.findByIdAndRemove(userIdentifier).exec();
        return true
    }

    async getUserByEmail(email: string): Promise<CreateUserDto> {
        return await UserModel.findOne({email: email}).exec();
    }

    async compararPass(password: string, user: UserDto): Promise<boolean> {
        const userTwo = await UserModel.findById(user._id).exec()
        return userTwo.comparePasswords(password)
    }

    async getUserByEmailIdentifier(email: string, identifier: string): Promise<boolean> {
        const data = await UserModel.find({email: email, identifier: identifier});
        return !data;
    }

    async getRolUser(id: string, potentialAction: string): Promise<UserDto | any> {
        return await UserModel.findById(id, {potentialAction: {$elemMatch: {$eq: potentialAction}}}).exec();
    }
}
