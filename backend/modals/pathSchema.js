import mongoose from "mongoose";
const pathSchema = new mongoose.Schema({
name:String,
email:String,
password:String,
pcerificate:String,
pathimage:String,
adress:String,
testList:[Object]
})
export const PathModal = mongoose.model("pathData",pathSchema);