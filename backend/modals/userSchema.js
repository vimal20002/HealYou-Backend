import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
name:String,
email:String,
password:String,
googleId:String,
imagedoc:String,
bookBed:[Object],
bookAppointment:[Object],
reports:[String]
})
export const UserModal = mongoose.model("userData",userSchema);