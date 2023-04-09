import mongoose from "mongoose";
const docSchema = new mongoose.Schema(
    {
        name:String,
        email:String,
        phoneNumber:String,
        password:String,
        degNumber:String,
        docImage:String,
        speciality:[String],
        qualifications:[String],
        docReviews:[String],
        appointments:[Object]
    }
)
export const DocModal = mongoose.model("docData",docSchema);
