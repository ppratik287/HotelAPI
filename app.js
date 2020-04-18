const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const guestRoutes =  require("./api/routes/guest")


mongoose.connect("mongodb+srv://hotel:guest@cluster0-6iyrl.mongodb.net/test?retryWrites=true&w=majority", { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use ("/guest", guestRoutes)

app.listen(process.env.port || 3000, function(){
    console.log("Server started.")
})