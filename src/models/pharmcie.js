const express = require("express");
const mongoose = require("mongoose");
const pharmacieSchema = new mongoose.Schema({
        
            id:{
                type:Number,
                require:true,
                unique:true
            }
           
        
    
})
//creation de  collection
const Pharmacie= new mongoose.model("Pharmcie",pharmacieSchema)
module.exports=Pharmacie;
