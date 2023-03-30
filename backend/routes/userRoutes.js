import express from "express";
import {googleLogin, logIn, register,bookBeds, bookAppointment} from "../controllers/controller.js";
const userRoute=express.Router();

userRoute.post('/register',register);
userRoute.post('/login',logIn);
userRoute.post('/googlelogin',googleLogin);
userRoute.post('/bookbed',bookBeds);
userRoute.post('/bookappointment',bookAppointment)
export default userRoute;