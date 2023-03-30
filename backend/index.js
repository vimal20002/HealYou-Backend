import express  from "express";
import mongoose  from "mongoose";
import cors  from "cors";
import userRoute from "./routes/userRoutes.js";

const app =  express();
app.use(cors());
app.use(express.json({limit:"30mb" ,extended:true}))
app.use(express.urlencoded({limit:"30mb" ,extended:true}))



app.get("/",(req,res)=>{
    res.send("I am Running");
})



const uri ="mongodb+srv://skk180509:gRUlh6hJV5JlR7bO@cluster0.2lfu1y8.mongodb.net/?retryWrites=true&w=majority";
try {
    mongoose.connect(uri)
    console.log("Connected")
} catch (err) {
    console.log(err)
}

const port = 4000;
app.use(userRoute);
app.listen(port,()=>{
console.log("App is running at 4000")
})