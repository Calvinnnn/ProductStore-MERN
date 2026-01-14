import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/dp.js';
import Product from './modles/product.model.js';
import mongoose from 'mongoose';
dotenv.config();
const app = express();



app.listen(5000,()=>{
    connectDB();
    console.log("Server started at http://localhost:5000");

});

app.use(express.json()); //allow to use accept json data in the req.body

app.get("/",(req,res)=>{
    res.send("Product List");
});

app.post("/api/products", async (req,res)=>{
    const product = req.body;
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({succsess:false,message:"All fields are required"});
    }
    const newProduct = new Product(product);
    try{
        await newProduct.save();
        res.status(201).json({succsess:true,data:newProduct});

    }catch(error){
        console.log("Error in creating product:",error.message)
        res.status(500).json({succsess:false,message:"Server Error"});
    }
});

app.delete("/api/products/:id",async (req,res)=>{
   const {id} = req.params;
   console.log("Deleting product with id:",id);
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({succsess:true,message:"Product deleted successfully"});
    }
    catch(error){
        console.log("Error in deleting product:",error.message)
        res.status(500).json({succsess:false,message:"Server Error"});
    }
});


app.get("/api/products",async (req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({succsess:true,data:products});
    }catch(error){
        console.log("Error in fetching products:",error.message)
        res.status(500).json({succsess:false,message:"Server Error"});
    }   
});

app.put("/api/products/:id",async (req,res)=>{
    const{id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({succsess:false,message:"Invalid product ID"});
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({succsess:true,data:updatedProduct});
    }catch(error){
        console.log("Error in updating product:",error.message)
        res.status(500).json({succsess:false,message:"Server Error"});
    }
});


console.log(process.env.MONGO_URI);

