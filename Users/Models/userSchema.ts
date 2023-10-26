import mongoose from "mongoose";
import {hash} from 'bcrypt'
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    password:{type:String,required:true}
})
userSchema.pre("save", async function (next) {
  const hashed: string = await hash(this.password, 8);
  this.password=hashed
  next();
});

export const Users = mongoose.model('Users', userSchema)