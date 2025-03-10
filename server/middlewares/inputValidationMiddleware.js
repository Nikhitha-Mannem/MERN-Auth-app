const Joi=require('joi');
const signupValidation=(req,res,next)=>{
    console.log("inside singup middleware")
    
    const schema=Joi.object({
        username:Joi.string().min(4).max(8).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(8).required()
    })

    const {error}=schema.validate(req.body);
    if(error){
        console.log("got error in validating inputs from middleware")
        return res.status(400).json({"Error":"Bad Request"})
    }
    else{
        next()

    }
    

}

const loginValidation=(req,res,next)=>{
    const schema=Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(8).required()
    })

    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({"Error":"Bad Request"})
    }
    next()

}

module.exports={signupValidation,loginValidation}

