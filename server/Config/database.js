const mongoose=require('mongoose');

const connectToDb=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to DB")
    }
    catch(err){
        console.log("Error in connecting to DB",err)

    }
}
module.exports=connectToDb;