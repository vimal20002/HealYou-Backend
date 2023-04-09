import express from "express";
import {  addDoc, register } from "../controllers/controller.js";



const hospRoute=express.Router();
hospRoute.post('/register',register);
hospRoute.post('/addhospdoc',addDoc);
export default hospRoute;