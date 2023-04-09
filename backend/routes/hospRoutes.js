import express from "express";
import {  addDoc, addRoom, register } from "../controllers/controller.js";



const hospRoute=express.Router();
hospRoute.post('/register',register);
hospRoute.post('/addhospdoc',addDoc);
hospRoute.post('/addroom',addRoom);
export default hospRoute;