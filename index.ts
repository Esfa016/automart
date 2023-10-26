import  express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import { vehicleRouter } from './Vehicles/Handlers/vehicleHandler'
import { connectMongoDb } from './Config/Database/database'
import { userRouter } from './Users/Handlers/userHandler';
const app = express()
const port = process.env.PORT || 8080
app.use(express.json({}))
app.use('/vehicle', vehicleRouter)
app.use('/user', userRouter)
app.listen(port, () => {
    console.log(port)
    connectMongoDb()
})