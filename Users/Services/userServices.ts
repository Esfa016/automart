import { ErrorMessages, SuccessMessages } from "../../Global/messages";
import { Users } from "../Models/userSchema";
import {
  CreateUserDto,
  LoginUserDto,
  UserUpdateDto,
} from "../Validations/userValidations";
import { Response } from "express";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { PaginationDto, PaginationHelper } from "../../Global/pagination";
import mongoose from "mongoose";
export class UserService {
  static async createUser(response: Response, body: CreateUserDto) {
    try {
      await Users.create(body);
      return response
        .status(201)
        .json({ success: true, message: SuccessMessages.saved });
    } catch (error) {
      throw error;
    }
  }

  static async loginUser(response: Response, body: LoginUserDto) {
    try {
      const userFound = await Users.findOne({ email: body.email });
      if (!userFound)
        return response
          .status(401)
          .json({ success: false, message: ErrorMessages.invalidCredentials });
      const passMatch: boolean = await compare(
        body.password!,
        userFound.password
      );
      if (!passMatch)
        return response.status(401).json({
          success: false,
          message: ErrorMessages.invalidCredentials,
        });
        const accessToken: string = sign({ id:userFound._id } , process.env.JWT!);
      return response
        .status(200)
        .json({ success: true, accessToken: accessToken });
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ success: false, message: ErrorMessages.serverError });
    }
  }

  static async getAllUsers(response: Response, pagination: PaginationDto) {
    try {
      const totalData = await Users.countDocuments();
      const data = await Users.find({}, { password: 0 })
        .skip(PaginationHelper.paginateQuery(pagination))
        .limit(pagination.limit);
      return response.status(200).json({ success: true, users: data , totalData:totalData});
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ success: false, message: ErrorMessages.serverError });
    }
  }

  static async getOneUser(
    response: Response,
    id: mongoose.Types.ObjectId
  ) {
    try {
      const data = await Users.findById(id, { password: 0 });
      return response.status(200).json({ success: true, user: data });
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ success: false, message: ErrorMessages.serverError });
    }
  }

  static async updateUser(
    response: Response,
    id: mongoose.Types.ObjectId,
    body: UserUpdateDto
  ) {
    try {
      const data = await Users.findByIdAndUpdate(id, body);
      if (!data)
        return response
          .status(404)
          .json({ success: false, message: ErrorMessages.notFound });
      return response
        .status(200)
        .json({ success: true, message: SuccessMessages.updated });
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ success: false, message: ErrorMessages.serverError });
    }
  }

  static async deleteUser(
    response: Response,
    id: mongoose.Types.ObjectId
  ) {
    try {
      const data = await Users.findByIdAndDelete(id);
      if (!data)
        return response
          .status(404)
          .json({ success: false, message: ErrorMessages.notFound });
      return response
        .status(200)
        .json({ success: true, message: SuccessMessages.deleted });
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ success: false, message: ErrorMessages.serverError });
    }
  }
}
