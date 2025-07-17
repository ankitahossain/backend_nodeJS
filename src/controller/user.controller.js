const userModel =  require("../models/user.model")
exports .registration = async(req, res)=>{
    try {

        const {userName,email,password, phoneNumber}=req.body
        if(!userName){
            return res.status(401).json({
                msg:"User name is missing"
            })
        }
         else if(!email){
            return res.status(401).json({
                msg:"Email is missing"
            })
        }
          else if(!password){
            return res.status(401).json({
                msg:"Password is missing"
            })
        }
          else if(!phoneNumber){
            return res.status(401).json({
                msg:"PhoneNumber is missing"
            })
        }
      const isEmailExist = await userModel.findOne({email:email})
      if(isEmailExist){
           return res.status(401).json({
            msg:"Email already exists"
           })  }  
    
        // save user data to database
   await userModel.create({
        userName,
        email,
        password,
         phoneNumber,
         ...req.body,
    }) .then(user => {
            res.status(201).json({ msg: "User registered successfully", user });
        })
        .catch(err => {
            res.status(500).json({ msg: "Database error", error: err.message });
        });
        
    } catch (error) {
        console.log("Error in registration",error)
         res.status(500).json({
            msg:"Internal server error"
        })
    }
    
}

// login controller

exports.login = async(req,res)=>{
    try {
        console.log(req.body)
        const isExists = await userModel.findOne({$and:[{email:req.body.email, password:req.body.password}]})
        console.log(isExists)
        if(!isExists){
            return res.status(401).json({
                msg:"Invalid email or password"
            })
        }
        // If login successful
         return res.status(401).json({
                msg:"Login successful"
            })
        }
    catch (error) {
          console.log("Error in login",error)
    }

}


    
   