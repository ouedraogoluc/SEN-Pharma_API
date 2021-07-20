const express = require("express");
const router = new express.Router();
const Pharmacie = require("../models/pharmcie");
//la fonction qui permet de creer une pharmcie
router.post("/pharmacie",async(req,res)=>{
    try {
       const addingPharmcieRecords= new Pharmacie(req.body)
       console.log(req.body);
       const insertPharmacie=await addingPharmcieRecords.save();
       res.send(insertPharmacie); 
       res.status(200);
    } catch (error) {
        res.status(400).send(error);
    }
})

//la fonction qui permet de recuperer tout les pharmacies

router.get("/pharmacie",async(req,res)=>{
    try {
     const getPharmacie= await  Pharmacie.find({}).sort({"id":1});
    res.send(getPharmacie);
    res.status(200);
    } catch (error) {
        res.status(400).send(error);
    }
})
//la fonction qui permet de recupperer une seul pharmcie
router.get("/pharmacie/:namePharmacie",async(req,res)=>{
    try {
        const _id =req.params.namePharmacie;
     const getPharmacie= await  Pharmacie.findById({_id})
    res.send(getPharmacie);
    res.status(200);
    } catch (error) {
        res.status(400).send(error);
    }
})
//la fonction qui permet de modifier une pharmacie
router.patch("/pharmacie/:id",async(req,res)=>{
    try {
        const _id =req.params.id;
        const getPharmacie= await  Pharmacie.findByIdAndUpdate(_id,req.body,{
         new:true
     });
     res.status(200);
    res.send(getPharmacie);
    } catch (error) {
        res.status(400).send(error);
    }
})

//la fonction qui permet de supprimer une pharmacie

router.delete("/pharmacie/:id",async(req,res)=>{
    try {
     const getPharmacie= await  Pharmacie.findByIdAndDelete(req.params.id);
    res.send(getPharmacie);
    res.status(200);
    } catch (error) {
        res.status(500).send(error);
    }
})
module.exports=router;
