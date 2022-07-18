import urlSlug from "url-slug";
import { UserNewDto } from "../dto/user/userNew.dto";
import { UserLoginDto } from "../dto/user/userLogin.dto";
import { AuthDto } from "../dto/user/auth.dto";
import { UserRepository } from "../repositories/user.repository";
import { generateToken } from "../helpers/jwt.helper";
import { CreateUserDto } from "../dto/user/createUser.dto";
import { UserToEncodeDto } from "../dto/user/userToEncode.dto";
import { CustomError } from "../models/custom-error.model";
import { decode } from "jsonwebtoken";
import { CreateUserTwoDto } from "../dto/user/createUserTwo.dto";

export interface AuthService {
  signUp(user: UserNewDto | null): Promise<CreateUserDto | null>;

  signIn(user: AuthDto | null): Promise<UserLoginDto | null>;
}

export class AuthServices implements AuthService {
  constructor(public readonly userRepository: UserRepository) {}

  async signUp(user: UserNewDto | null): Promise<CreateUserDto | null> {
    if (!user.password || !user.repeatPassword) {
      throw new CustomError("Check password.", 400, "Missing check password.");
    }

    if (user.password !== user.repeatPassword) {
      throw new CustomError(
        "Empty password.",
        400,
        "Passwords are not the same."
      );
    }

    const userIdentifier = await this.userRepository.getUserIdentifier(
      user.identifier
    );

    if (!userIdentifier === undefined || !userIdentifier === null) {
      throw new CustomError(
        "Error the identifier",
        400,
        "User exists, there is a record of the identifier."
      );
    }

    const userEmail = await this.userRepository.getUserByEmail(user.email);

    if (userEmail) {
      throw new CustomError(
        "Error the email",
        400,
        "User exists, there is a record of the email."
      );
    }

    const email = user.email.toLowerCase();

    const userExist = await this.userRepository.getUserByEmailIdentifier(
      email,
      user.identifier
    );

    if (!userExist === false) {
      throw new CustomError(
        "User already exist.",
        400,
        "ID already exist, This ID is already registered in our database, please check the ID field."
      );
    }
    let url: string = urlSlug(`${user.name}-${user.identifier}`).toLowerCase();

    let userFinal: CreateUserTwoDto = {
      name: user.name,
      userName: user.userName || null,
      identifier: user.identifier,
      telephone: user.telephone,
      email: user.email,
      password: user.password,
      dateCreate: new Date(),
      userUpdate: new Date(),
      birthDate: user.birthDate,
      gender: user.gender,
      nationality: null,
      potentialAction: ["consumer"],
      active: true,
    };

    const userExitTwo = await this.userRepository.createUser(userFinal);

    if (!userExitTwo) {
      throw new CustomError(
        "Error user exist.",
        400,
        "please check if user data."
      );
    }

    return userExitTwo;
  }

  async signIn(user: AuthDto | null): Promise<UserLoginDto | null> {
    const email = user.email.toLowerCase();
    const userExist = await this.userRepository.getUserByEmail(email);
    if (!userExist) {
      throw new CustomError(
        "Email does not exist.",
        400,
        "please check the email."
      );
    }

    let validPassword = await this.userRepository.compararPass(
      user.password,
      userExist
    );
    if (validPassword === false) {
      throw new CustomError(
        "Invalid Password.",
        400,
        "please check the password."
      );
    }

    let userToEncode: UserToEncodeDto = {
      id: userExist._id,
      name: userExist.name,
      identifier: userExist.identifier,
      telephone: userExist.telephone,
      email: userExist.email,
      potentialAction: userExist.potentialAction
    };

    const token = generateToken(userToEncode);
    return { user: userToEncode, token: token };
  }

}
