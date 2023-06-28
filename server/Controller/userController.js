const userModel=require('../models/userModel');

const bcrypt=require('bcrypt');
const validator=require('validator');
const jwt=require('jsonwebtoken');

const createToken=(_id)=>{
       const jwtkey=process.env.JWT_SECRET_KEY;

       return jwt.sign({_id},jwtkey,{expiresIn:"3d"});
}


const registerUser= async (req,res)=>{

       try{
       const {name,email,password} =req.body;

       let user=await userModel.findOne({email});
       if(user)
       {
              return res.status(400).json("User Already Exists");
       }

       if(!name||!email||!password) return res.status(400).json("All Fileds Are Required");

       if(!validator.isEmail(email)) return res.status(400).json("Email Should be Valid");

       if(!validator.isStrongPassword(password)) return res.status(400).json("Password must be Strong password");

       user=new userModel({name,email,password})
       
       const salt= await bcrypt.genSalt(10);
       user.password=await bcrypt.hash(user.password,salt);

       await user.save();

       const token=createToken(user._id);

       res.status(200).json({_id:user.id,name,email,token});
}
catch(err){
       console.log("ERROR ERROR");
       console.log(err);
       res.status(500).json(err);
}
}

const loginUser=async (req,res)=>{
       const {email,password}=req.body;
       try{
              let user=await userModel.findOne({email});
               

              if(!user) return res.status(400).json("invalid Username or passowrd");
              
              let validStatus=false;
              let isValidPassword = await bcrypt.compare(password,user.password);
              console.log(isValidPassword);
              
              if(!isValidPassword) return res.status(400).json("invalid Username or passowrd");

              const token=createToken(user._id);
              res.status(200).json({_id:user.id,name:user.name,email,token});
       }
       catch(err)
       {
              console.log(err);
       }
};

const findUser = async(req,res)=>{
       const userId=req.params.userId;
       try{
              const user=await userModel.findById(userId);

              res.status(200).json(user);
       }
       catch(err)
       {
              console.log(err);
       }
       
};

const getUsers = async(req,res)=>{
       
       try{
              const users=await userModel.find();

              res.status(200).json(users);
       }
       catch(err)
       {
              console.log(err);
       }
       
};

module.exports={registerUser,loginUser,findUser,getUsers};