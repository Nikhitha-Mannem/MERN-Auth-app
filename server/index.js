const express=require('express');
const app=express();
const cors=require('cors');
require('dotenv').config();
const authDb=require('./Config/database');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

//Routes
const authRouter=require('./Routes/authRouter')
app.use('/auth',authRouter);


authDb();


app.listen(process.env.PORT || 3050,()=>{
    console.log("Server is running in port number 3050")
})