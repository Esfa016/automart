import { Request, Response, Router } from "express";
import { UserService } from "../Services/userServices";
import { createUserMiddleware, loginUserMiddleware } from "../Middlewares/userMiddleware";
import { PaginationDto } from "../../Global/pagination";
import mongoose from "mongoose";
const router = Router();

router
  .post("/", createUserMiddleware, (request: Request, response: Response) => {
    UserService.createUser(response, request.body);
  })
  .get("/", (request: Request, response: Response) => {
    const paginate = {
      page: parseInt(request.query.page?.toString()!),
      limit: parseFloat(request.query.limit?.toString()!),
    };
    UserService.getAllUsers(response, paginate);
  })
  .get("/:id", (request: Request, response: Response) => {
    UserService.getOneUser(
      response,
      new mongoose.Types.ObjectId(request.params.id)
    );
  })
  .put("/:id", (request: Request, response: Response) => {
    UserService.updateUser(
      response,
      new mongoose.Types.ObjectId(request.params.id),
      request.body
    );
  })
  .delete("/:id", (request: Request, response: Response) => {
    UserService.deleteUser(
      response,
      new mongoose.Types.ObjectId(request.params.id)
    );
  })
  .post("/login", loginUserMiddleware,(request:Request,response:Response)=>UserService.loginUser(response,request.body));

export { router as userRouter };
