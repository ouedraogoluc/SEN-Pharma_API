const express = require("express");
const router1= new express.Router();
const User = require("../models/user");
const bcrypt= require('bcrypt');

router1.post('/signup',(req,res)=>{
       let{firstName,lastName,email,password}=req.body;
       firstName=firstName.trim();
       lastName=lastName.trim();
       email=email.trim();
       password=password.trim();
       if (firstName=="" || lastName=="" || email=="" || password=="" ) {
             res.json({
                 status:"echec",
                 message:"veillez renseigner  les champs svp"
             });
       }else if (firstName.length<3) {
        // !/^[a-zA-z]*$/.api_rest_db(firstName)77 649 52 90
        res.json({
            status:"echec",
            message:"le nom entrer est invalide"
        });
       } else if (email.length <4)  {
       // !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}*$/.api_rest_db(email)
        res.json({
            status:"echec",
            message:"le email  entrer est invalide"
        });
       }else if (password.length<8) {
        res.json({
            status:"echec",
            message:"le password   entrer est invalide"
        });
       }else{
        User.find({email}).then(result=>{
            if (result.length) {
                //si l'utilisateur exist
                res.json({
                    status:"echec",
                    message:" email exit deja "
                });
            }else{
                const saltRounds=10;
                bcrypt.hash(password,saltRounds).then(hashedPassword=>{
                  const newUser = new User({
                    firstName,
                    lastName,
                    email,
                    password:hashedPassword
                  })
                  newUser.save().then(result=>{
                    res.json({
                        status:"success",
                        message:"inscription reussir",
                        data:result
                    });
                  }).catch(err=>{
                    console.log(err);
                    res.json({
                        status:"echec",
                        message:"une error s'est produite "
                    });
                })
                }).catch(err=>{
                    res.json({
                        status:"echec",
                        message:" email exit deja "
                    });
                })
            }
        }).catch(err=>{
            console.log(err);
            res.json({
                status:"echec",
                message:"erreur de hashage de mot de passe "
            });
        })
       }
}) 

router1.post('/signin',(req,res)=>{
    let{email,password}=req.body;
    email=email.trim();
    password=password.trim();
    if (email=="" || password=="" ) {
        res.json({
            status:"echec",
            message:"veillez renseigner tout les champs !"
        });
    }else{
      User.find({email})
      .then(data=>{
          if (data.length) {
              const  hashedPassword=data[0].password;
              bcrypt.compare(password,hashedPassword).then(result=>{
                  if (result) {
                    res.json({
                        status:"Success",
                        message:"connexion reussir!",
                        data:data
                    });
                  }else{
                    res.json({
                        status:"echec",
                        message:"echec de connexion !"
                    }); 
                  }
              }).catch(err=>{
                res.json({
                    status:"echec",
                    message:" une erreur s'est produit lors de la comparaison du mot de passe !"
                }); 
              })
          }else{
            res.json({
                status:"echec",
                message:"veillez renseigner tout les champs !"
            });
          }
      }).catch(err=>{
        res.json({
            status:"echec",
            message:" une erreur s'est produit lors de la vérification d'existant!"
        }); 
      })
    }
})

module.exports=router1;



