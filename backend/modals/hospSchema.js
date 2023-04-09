import mongoose from "mongoose";
const hospSchema = new mongoose.Schema({
name:String,
email:String,
password:String,
dcert:String,
dimg:String,
adress:String,
docList:[Object],
roomType:String,
totalRooms:String,
location:[String],
currBeds:String,
hospReviews:[String]
})
export const HospModal = mongoose.model("hospData",hospSchema);