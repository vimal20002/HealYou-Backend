import mongoose from "mongoose";
const hospSchema = new mongoose.Schema({
name:String,
email:String,
password:String,
dcert:String,
dimg:String,
adress:String,
docList:[Object],
roomlist:[Object],
location:[String],
hospReviews:[Object]
})
export const HospModal = mongoose.model("hospData",hospSchema);