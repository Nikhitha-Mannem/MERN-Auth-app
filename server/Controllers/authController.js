const User=require('../Models/User');
const bcrypt=require('bcrypt');
const JWT=require('jsonwebtoken');

exports.registerUser=async (req,res,next)=>{
    //console.log("inside regisetrUser controller")
    const {username,email,password}=req.body;
    const hashedPassword=await bcrypt.hash(password,10);
    try{
        const newUser=new User({username:username,email:email,password:hashedPassword});
        await newUser.save();
        res.json({'message':"User Registered Successfully"})

    }
    catch(err){
        res.json({'Error':"Internal Server Error"})
        
    }
    



}

exports.loginUser=async (req,res,next)=>{
    const {email,password}=req.body;
    const user= await User.findOne({email:email});
    if(!user){
        res.json({'Error':"User Not Found"})
    }
    else{
        const isValid=await bcrypt.compare(password,user.password);
        if(!isValid){
            res.json({'Error':"Invalid Credentials"})
        }
        else{
            const jwt_token=JWT.sign({username:user.username,userId:user._id},process.env.SECRET,{expiresIn:'1h'});
            res.json({'message':"Login Successful",'token':jwt_token,'username':user.username});
        }
    }


}