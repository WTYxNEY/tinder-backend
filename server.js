// import express from "express"
// import mongoose from "mongoose"
// import Cards from './dbCards'
//enter password: C1JQKbp9nqyJtrjH
const express = require('express');
const mongoose = require('mongoose');
const Cors = require('cors')

const Cards = require('./dbCards');
//App config
const app = express();
const port = process.env.PORT || 8001; //ตั้งค่า portโดย process.env.PORT ใช้บน heroku
const connection_url = `mongodb+srv://admin:C1JQKbp9nqyJtrjH@cluster0.s65df.mongodb.net/tinderdb?retryWrites=true&w=majority`
//Middlewares
app.use(express.json());
app.use(Cors());

//DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

//API Endpoint

app.get("/", (req, res) => res.status(200).send("Hello World!!"));
app.post('/tinder/cards', (req,res) => {
    const dbCard = req.body ;

    Cards.create(dbCard, (err, data) => {
        if (err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
});

app.get("/tinder/cards", (req, res)=>{
    Cards.find((err, data) => {
        if (err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
})

// //Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));