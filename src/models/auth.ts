

import { Schema, Types, model } from 'mongoose';


export interface IUser {
    fullName: string;
    email: string;
    createdOn: Date;
    updatedOn: Date
}

export const User = model<IUser>('User',
    new Schema<IUser>({
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true, index: true },
        createdOn: { type: Date },
        updatedOn: { type: Date }
    })
);

export interface IUserCredentials {
    user: Types.ObjectId;
    username: string;
    passwordHash: string;
    createdOn: Date;
    updatedOn: Date
}

export const UserCredentials = model<IUserCredentials>('UserCredentials',
    new Schema<IUserCredentials>({
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        username: { type: String, required: true },
        passwordHash: { type: String },
        createdOn: { type: Date },
        updatedOn: { type: Date }
    })
);

