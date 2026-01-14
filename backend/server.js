import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/dp.js';
dotenv.config();
const app = express();



app.listen(5000,()=>{
    connectDB();
    console.log("Server started at http://localhost:5000");

});

app.get("/",(req,res)=>{
    res.send("Product List");
});

console.log(process.env.MONGO_URI);

