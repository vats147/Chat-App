const express=require('express');
const cors =require('cors');
const mongoose=require('mongoose');
const userRoute=require('./Routes/userRoute');

const app=express();
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use("/api/users",userRoute);
 
const PORT=process.env.PORT || 3000;
const uri=process.env.ATLAS_URI;

app.get("/",(req,res)=>{
       res.send("Hello World");
});

mongoose.connect(uri,{
       useNewUrlparser:true,
       useUnifiedTopology:true
}).then(()=>{
       console.log("Mongo Connect");
}).catch((error)=>{
       console.log("Connection Failed");
       console.log(error);
})

app.listen(3000,(req,res)=>{
       console.log(`Server Started on port:${PORT}`);
})

