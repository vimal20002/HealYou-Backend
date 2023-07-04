import { UserModal } from "../modals/userSchema.js";
import { DocModal } from "../modals/docSchema.js";
import bcrypt from "bcryptjs";
import { PathModal } from "../modals/pathSchema.js";
import { HospModal } from "../modals/hospSchema.js";
export const register = async (req, res) => {
    console.log(req.body)
    try {
        const type=req.body.type;
         if(type==="user"){
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
        }
         if(type==="hospital"){
    
            let hospital = await HospModal.findOne({ email: req.body.email })
        
            if (hospital !== null) {
                res.send("Hospital Already Register");
            }
            else {
                console.log(req.body)
                const salt = await bcrypt.genSalt(10)
                const hpass = await bcrypt.hash(req.body.password, salt); 
                const nhosp = new HospModal({ ...req.body, password: hpass });
                console.log(nhosp)
                await nhosp.save();
                res.json(nuser);
             }

         }
         if(type==="pathalogy"){

            let pathalogy = await PathModal.findOne({ email: req.body.email })
        
            if (pathalogy !== null) {
                res.send("Pathalogy Already Register");
            }
            else {
                console.log(req.body)
                const salt = await bcrypt.genSalt(10)
                const hpass = await bcrypt.hash(req.body.password, salt); 
                const npath = new PathModal({ ...req.body, password: hpass });
                console.log(npath)
                await npath.save();
                res.json(npath);
             }
         }
         if(type==="doctor"){
            
            let doctor = await DocModal.findOne({ email: req.body.email })
        
            if (doctor !== null) {
                res.send("Hospital Already Register");
            }
            else {
                console.log(req.body)
                const salt = await bcrypt.genSalt(10)
                const hpass = await bcrypt.hash(req.body.password, salt); 
                const ndoc = new DocModal({ ...req.body, password: hpass });
                console.log(ndoc)
                await ndoc.save();
                res.json(ndoc);
             }       
        }

    } catch (error) {
        res.send(error)
    }

}
export const logIn=async(req,res)=>{
  
    try {
        console.log(req.body)
         let type=req.body.type;
         if(type==="user"){
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
        }
        if(type==="doctor"){
            const doc=await DocModal.findOne({email:req.body.email});
            if(doc!==null){
              const passwordCompare= await bcrypt.compare(req.body.password,doc.password)
              if(passwordCompare){
               res.json(doc);
              }
              else{
               res.json({message: "Invalid Credentials"});
              }
            }
           }

           if(type==="hospital"){
            const hosp=await HospModal.findOne({email:req.body.email});
            if(hosp!==null){
              const passwordCompare= await bcrypt.compare(req.body.password,hosp.password)
              if(passwordCompare){
               res.json(hosp);
              }
              else{
               res.json({message: "Invalid Credentials"});
              }
            }
           }
           if(type==="pathalogy"){
            const path=await PathModal.findOne({email:req.body.email});
            if(path!==null){
              const passwordCompare= await bcrypt.compare(req.body.password,path.password)
              if(passwordCompare){
               res.json(path);
              }
              else{
               res.json({message: "Invalid Credentials"});
              }
            }
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
        
        console.log(req.body)
      const user=await UserModal.findOne({email:req.body.email});
      const nbed={
        patientName:req.body.name,
        adhaar:req.body.adhar,
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
      let doc=await DocModal.findOne({email:req.body.docEmail});
      const arr1=doc.appointments;
      const ndocappoint={...nappointment,email:req.body.email};
      arr1.push(ndocappoint);
      console.log(arr1)
      doc.appointments=arr1
      await doc.save();


        console.log(doc);
       console.log(user);
      res.json({message:"Appointment Booked ! You will shortly recieve an mail containing G-Meet Link."});
    } catch (error) {
     res.send(error);
    }
}
export const uploadReports=async(req,res)=>{
    try {
        const user=await UserModal.findOne({email:req.body.email});
      
      const arr = user.reports;
      arr.push(req.body.reports)
      user.reports= arr;
      await user.save();
      
       console.log(user);
      res.json({message:"Report Uplaoded Successfully!"});
    } catch (error) {
        res.send(error);
    }
}
export const docReview=async(req,res)=>{
    try {
         const doc= await DocModal.findOne({email:req.body.email});
         if(doc!==null){
            
            const review={
                docreview:req.body.review
            }
            const arr=doc.docReviews;
            console.log(arr)
            arr.push(review);
            doc.docReviews=arr;
             await doc.save();
             res.json(doc)
         }
        
    } catch (error) {
        res.send(error);
    }
}
export const hospReview=async(req,res)=>{
    try {
         const hosp= await HospModal.findOne({email:req.body.email});
         if(hosp!==null){
            
            const review={
                hospreview:req.body.review
            }
            const arr=hosp.hospReviews;
         
            arr.push(review);

            hosp.hospReviews=arr;
             await hosp.save();
             console.log(hosp);
             res.json(hosp)
         }
        
    } catch (error) {
        res.send(error);
    }
}
export const addDoc=async(req,res)=>{
    try {
        let hosp=await HospModal.findOne({email:req.body.email});
        if(hosp!==null){
            const ndoc={
                name:req.body.name,
                tel:req.body.tel,
                qual:req.body.qal,
                spec:req.body.spec,
                cert:req.body.cert,
                dimg:req.body.dimg
            }
           const arr=hosp.docList;
           arr.push(ndoc);
           hosp.docList=arr;
           await hosp.save();
           console.log(hosp);
           res.send(hosp);
        }
        else{
            res.send({message:"Please Register First"})
        }
    } catch (error) {
        res.send(error);
    }
}
export const addRoom=async(req,res)=>{
   try {
     console.log(req.body);
      let hosp=await HospModal.findOne({email:req.body.email});
      if(hosp!==null){
        const roominfo={
            type:req.body.type,
            count:req.body.count,
            price:req.body.price
        }
        const arr=hosp.roomlist;
        arr.push(roominfo);
        hosp.roomlist=arr;
         await hosp.save();
        console.log(hosp);
        res.send(hosp);
      }
   } catch (error) {
    res.send(error)
   }
      
}






