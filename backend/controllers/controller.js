import { UserModal } from "../modals/userSchema.js";
import bcrypt from "bcryptjs";
export const register = async (req, res) => {
    try {
        let user = await UserModal.findOne({ email: req.body.email })
        
        if (user !== null) {
            res.send("User Already Exists");
        }
        else {
            console.log(req.body)
            const salt = await bcrypt.genSalt(10)
            const hpass = await bcrypt.hash(req.body.password, salt); 
            const nuser = new UserModal({ ...req.body, password: hpass });
            console.log(nuser)
            await nuser.save();
            res.json(nuser);
        }

    } catch (error) {
        res.send(error)
    }

}
export const logIn=async(req,res)=>{
  
    try {
         const user=await UserModal.findOne({email:req.body.email});
         if(user!==null){
           const passwordCompare= await bcrypt.compare(req.body.password,user.password)
           if(passwordCompare){
            res.json(user);
           }
           else{
            res.json({message: "Invalid Credentials"});
           }
         }
         else{
          res.json({message: "Invalid Credentials"});

         }
    } catch (error) {
        res.send(error)
    }
}
export const googleLogin=async(req,res)=>{
    try {
        const user=await UserModal.findOne({googleId:req.body.googleId});
        if(user!=null){
           res.json(user);
        }
        else{
           const nuser= new UserModal(req.body) ;
           await nuser.save();
           res.json(nuser);
        }
    } catch (error) {
        res.send(error);
    }
}
export const bookBeds=async(req,res)=>{
    try {
      const user=await UserModal.findOne({email:req.body.email});
      const nbed={
        patientName:req.body.name,
        adhaar:req.body.adhaar,
      }
      const arr = user.bookBed;
      arr.push(nbed)
      user.bookBed = arr;
      await user.save();
   
       console.log(user);
      res.json({message:"Bed Awaits You !"});
    } catch (error) {
     res.send(error);
    }
}
export const bookAppointment=async(req,res)=>{
    try {
      const user=await UserModal.findOne({email:req.body.email});
      const nappointment={
        patientName:req.body.name,
        adhaar:req.body.adhaar,
        disease:req.body.disease
      }
      const arr = user.bookAppointment;
      arr.push(nappointment)
      user.bookAppointment= arr;
      await user.save();
   
       console.log(user);
      res.json({message:"Appointment Booked ! You will shortly recieve an mail containing G-Meet Link."});
    } catch (error) {
     res.send(error);
    }
}


