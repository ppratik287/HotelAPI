const express = require("express");
const router = express.Router()
const mongoose = require("mongoose");
const Guest = require("../models/guest")



router.get("/", (req,res,next)=>{
   Guest.find().exec()
   .then(docs=>{
       const response = {
            count: docs.length,
            booking: docs.map(doc => {
            return {
                name: doc.name,
                id: doc._id,
                rooms: doc.rooms,
                pool: doc.Pool,
                request: {
              type: "GET",
              url: "http://localhost:3000/guest/" + doc._id
            }
            }
            })
        }
        res.status(200).json(response);
    })
   .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  })
});

router.post("/", (req,res,next)=>{
   
    const guest = new Guest({
            name: req.body.name,
            address: req.body.address,
            rooms: req.body.rooms,
            cost: req.body.cost,
            max_guests: req.body.max_guests,
            pool: req.body.pool,
            laundry: req.body.laundry,
            cab_service: req.body.cab_service
        })
        guest
        .save()
        .then(result =>{
            console.log(result);
            res.status(201).json({
                message: "Booking successful.",
                bookingDetails: {
                    name: result.name,
                    id: result._id,
                    request:{
                        type:"GET",
                        url: "http://localhost:3000/guest/" + result._id
                    }
                }
        })
        .catch(err =>{
            console.log(err),
            res.status(500).json({
                error:err
            })
        })
    
        
        })
})

router.get("/:id", (req,res,next)=>{
    const id = req.params.id
    Guest.findById(id)
    .exec()
    .then(doc=>{console.log(doc)
        if(doc){
            res.status(200).json({
                booking: doc,
                request:{
                    type:"GET",
                    url: "http://localhost:3000/guest"
                }
            })
        }
        else{
            res.status(404).json({
                message: "No valid booking found"
            })
        }
       
    })
    .catch(err =>{
        console.log(err),
        res.status(500).json({
            error:err
        })
    });
})
router.patch("/:id", (req,res, next)=>{
    const id= req.params.id
    const updateOps = {};
    for( const ops of req.body){
        updateOps[ops.propName]= ops.value;
    }
    Guest.update({_id:id}, { $set: updateOps})
    .exec()
    .then(result =>{
        console.log(result)
        res.status(200).json({
            message: "Booking Updated",
            request: {
                type: "GET",
                url: "http://localhost:3000/guest/"+req.params.id
            }
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

router.delete("/:id", (req,res,next)=>{
    const id= req.params.id
    Guest.remove({_id:id})
    .exec()
    .then(result =>{
        res.status(200).json({
            message: "Booking deleted",
            request: {
                type: "POST",
                url: "http://localhost:3000/guest",
               
            }
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})


module.exports= router
