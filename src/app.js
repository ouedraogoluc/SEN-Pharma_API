//IMPORTATION DE express js
const express = require("express");
const app = express();

//appel a la base de donne
require("../src/db/conn");
//appel aux routers
const router = require("../src/router/pharmacie");
const router1 = require("../src/router/user");
//initiation de port
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(router);
app.use(router1);

//ecoute du port
app.get("/",async(req,res)=>{
    res.send("hello");
  })
  app.listen(port,()=>{
      console.log(`la connexion est ouverte sur le port.${port}`);
  })