import { Required, Email, Optional,  } from "joi-typescript-validator";

export class CreateUserDto{
    @Required()
    fullName: string | undefined
    @Email()
    email: string | undefined
    @Email()
    password:string|undefined
}

export class LoginUserDto{
    @Required()
    email: string | undefined
    @Required()
    password:string|undefined
}

export class UserUpdateDto{
    @Optional()
    fullName: string | undefined
    @Optional()
    email: string | undefined
    @Optional()
    password: string | undefined
    // I know updating password and email like this is not good... it is just for test..
    
}