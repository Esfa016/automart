import mongoose from "mongoose";
const vehicleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  model:{type:String,required:false},
  image: { type: String, required: false },
});
export const Vehicles = mongoose.model("Vehicles", vehicleSchema);
