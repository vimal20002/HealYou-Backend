import express from "express";
import {  register } from "../controllers/controller.js";



const hospRoute=express.Router();
hospRoute.post('/register',register);
export default hospRoute;