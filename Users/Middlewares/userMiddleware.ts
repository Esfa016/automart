import { Request, Response, NextFunction } from "express";
import { Validate } from "joi-typescript-validator";
import { CreateUserDto, LoginUserDto } from "../Validations/userValidations";
import { ErrorMessages } from "../../Global/messages";
import { JwtPayload, verify } from "jsonwebtoken";
import mongoose from "mongoose";
import { UserType } from "../../Global/types";
export function createUserMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const result = Validate(CreateUserDto, request.body);
  if (result.error)
    return response
      .status(400)
      .json({ success: false, message: result.error.message });
  next();
}
export function loginUserMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const result = Validate(LoginUserDto, request.body);
  if (result.error)
    return response
      .status(400)
      .json({ success: false, message: result.error.message });
  next();
}
declare global{
    namespace Express{
        interface Request{
            user:string|JwtPayload|UserType|undefined
        }
    }
}
export function authentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return response
      .status(401)
            .json({ success: false, message: ErrorMessages.unAuthorized });
    
  verify(token, process.env.JWT!, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError")
        return response
          .status(403)
          .json({ success: false, message: ErrorMessages.sessionTimeOur });
      }
      request.user = (user as UserType).id
      next()

  });
}
