const express=require('express');
const chatModel=require('../models/chatModel');

// CreateChat
const createChat=async(req,res)=>
{
       const {firstId,secondId}=req.body;
       
       try{
              const chat=await chatModel.findOne({
                     members:{$all:[firstId,secondId]}
              });
              if(chat) return res.status(200).json(chat);

              const newChat=new chatModel({
                     members:[firstId,secondId]
              });

              const response=await newChat.save();
              res.status(200).json(response);
       }
       catch(err)
       {
              console.log("ERR",__filename);
              console.log(error);
              res.status(500).json(error);
       }
}
// getUserChats
const findUserChats= async (req,res)=>{
       const userId=req.params.userId;
       try{
              const chats=await chatModel.find({
                     members:{$in:[userId]}
              })
              res.status(200).json(chats)
             
       }catch(err){
              console.log("ERR",__filename);
              console.log(error);
              res.status(500).json(error);
       }
}

const findChat= async (req,res)=>{
       const {firstId,secondId}=req.body;
       try{
              const chat=await chatModel.findOne({
                     members:{$all:[firstId,secondId]}
              })
              res.status(200).json(chat)
             
       }catch(err){
              console.log("ERR",__filename);
              console.log(error);
              res.status(500).json(error);
       }
}
module.exports = {createChat,findUserChats,findChat};