import {NextFunction} from 'express';
import {Schema, model, Model} from 'mongoose';
import {CreateUserDto} from '../dto/user/createUser.dto';
import {compareSync, genSaltSync, hashSync} from 'bcryptjs';

interface InstanceMethods {
    comparePasswords: (password: string) => boolean
}

interface UserModel extends Model<CreateUserDto, {}, InstanceMethods> {
    comparePasswords: (password: string) => boolean
}

const userSchema = new Schema<CreateUserDto, UserModel, InstanceMethods>({
    name: {type: String, require: true},
    userName: {type: String, require: true},
    identifier: {
        type: String,
        unique: true,
        require: true,
    },
    telephone: Number,
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {type: String, require: true},
    dateCreate: Date,
    userUpdate: Date,
    birthDate: Date,
    gender: {
        type: String,
        enum: ["M", "F"],
        min: 0,
        max: 1
    },
    nationality: String,
    potentialAction: [
        {
            type: String,
            enum: ["consumer", "admin"],
            default: "consumer"
        }
    ],
    active: Boolean
});

//metodo que nos sirve para devolver datos sin enviar la contraseña cuando pidan datos del usuario
userSchema.methods.toJSON = function () {
    let user = this.toObject();
    delete user.password;
    return user;
};

//metodo para comparar las contraseñas
userSchema.methods.comparePasswords = function (password: string): boolean {
    return compareSync(password, this.password);
};


//metodo para encryptar la contraseña cuando actualizan
userSchema.pre("findOneAndUpdate", async function (next: NextFunction) {
    const update: any = this;

    if (!update.password) {
        return next();
    }

    const salt = genSaltSync(10);
    update.password = hashSync(update.password, salt);
    next();
});


export const UserModel = model<CreateUserDto, UserModel, InstanceMethods>("User", userSchema);
