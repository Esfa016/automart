import mongoose from "mongoose";
const conString: string = process.env.DB_CONN!;
export function connectMongoDb() {
    console.log(conString)
  mongoose
    .connect(conString)
    .then(() => console.log("Server up and running"))
    .catch((error) => console.error(error));
}
