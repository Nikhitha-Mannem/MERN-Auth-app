const User=require('../Models/User');
const bcrypt=require('bcrypt');
const JWT=require('jsonwebtoken');
const nodemailer=require('nodemailer');


exports.registerUser=async (req,res,next)=>{
    //console.log("inside regisetrUser controller")
    const {username,email,password}=req.body;
    const hashedPassword=await bcrypt.hash(password,10);
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'sample@gmail.com',
            pass:'**** **** **** ****'
        }
    })
    try {
        const newUser = new User({ username: username, email: email, password: hashedPassword });
        await newUser.save();
        
        // Send success message to the client after user is saved successfully
        res.json({ 'message': "User Registered Successfully" });
    
        // Send a welcome email (email logic is separate)
        try {
            await transporter.sendMail({
                from: 'nikhithamannem123@gmail.com',
                to: email,
                subject: "SignUp Successful",
                html: '<h2>You have signed in to my website!</h2>',
            });
        } catch (emailError) {
            console.error("Error in sending email:", emailError);
            //res.status(500).json({ 'Error': "User registered but failed to send confirmation email." });
        }
    } catch (err) {
        console.error("Error in registering user:", err);
        res.status(500).json({ 'Error': "Internal Server Error" });
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


exports.mailResetLink=async (req,res,next)=>{
    const {email}= req.body;
    console.log(typeof email);
    const user=await User.findOne({email:email})
    console.log(user);
    if(!user){
        res.json({Error:"User Not Found"})
    }
    else{
        const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'nikhithamannem123@gmail.com',
                pass:'feew xiaq llxv gmks'
            }
        })
        const token=JWT.sign({email:email},process.env.SECRET,{expiresIn:'1h'});
        try{

            await transporter.sendMail({
                from:'nikhithamannem123@gmail.com',
                to:email,
                subject:'Password Reset Link',
                html:`
                <p>Click on the link to reset your password</p>
                <a href="http://localhost:3000/reset-password/${token}">Change password</button>
                `
            })
            res.json({message:"Password Reset Link sent to Mail"})

        }
        catch(err){
            res.json({Error:"Error in sending Reset Password Mail"})
        }
        
    }

}

exports.resetPassword=async (req,res,next)=>{
    const token=req.params.token;
    const {email,newPassword}=req.body;
    const decoded=JWT.verify(token,process.env.SECRET);
    if(!decoded){
        res.Json({Error:"Failed to Reset Password"})
    }
    else{
        try{
          const user = await User.findOne({email:email});
          if(!user){
            res.json({Erro:"User not Found"})
          }
          else{
            user.password=await bcrypt.hash(newPassword,10);
            await user.save()
            res.json({message:"Password Reset Successful"})
          }



        }
        catch(err){
            res.json({Error:"Failed to Reset Password"})
        }


    }
}
