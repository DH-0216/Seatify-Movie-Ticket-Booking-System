import express from 'express';
import { getUserBookings } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/bookings', getUserBookings)
userRouter.post("/update-favorite", updateFavorite)
userRouter.get("/favorite", getUserfavorites)

export default userRouter;
