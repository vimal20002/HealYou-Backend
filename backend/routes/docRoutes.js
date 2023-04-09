import express from "express";
import { docReview, register } from "../controllers/controller.js";



const docRoute=express.Router();
docRoute.post('/register',register);
docRoute.post('/docreview',docReview);
export default docRoute;