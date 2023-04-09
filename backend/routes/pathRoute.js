import express from "express";
import {  register } from "../controllers/controller.js";



const pathRoute=express.Router();
pathRoute.post('/register',register);
export default pathRoute;