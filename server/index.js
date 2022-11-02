// const express=require("express");
// const bodyparser=require("body-parser");
// const mongoose=require("mongoose");
// const cors=require("cors");
import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/posts.js";
const app=express();
app.use(bodyparser.json({limit:"30mb",extended:true}));
app.use(bodyparser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
const CONNECTION_URL='mongodb+srv://vansh:teppalwar@backend.hlinoco.mongodb.net/restaurant?retryWrites=true&w=majority';
const PORT=process.env.PORT||5000;
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
        .then(()=>app.listen(PORT,()=>console.log(`server running on port : ${PORT}`)))
        .catch((err)=>console.log('monog error',err));
// mongoose.set('useFindAndModify',false);

app.use('/name',router);