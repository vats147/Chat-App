const express=require('express');
const {createMessge,getMessages} =require('../Controller/messageController');
const router=express.Router();

router.post("/",createMessge);
router.get("/:chatId",getMessages);

module.exports=router;