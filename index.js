const express = require("express");
const app = express();
const axios = require("axios");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const userRouter = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

// Connection to database
mongoose.connect(process.env.MONGO_URI, ()=>{
  console.log("Connected to database");
})

// Deployement
const __dirname1 = path.resolve();
if(process.env.NODE_ENV == "production"){

  app.use(express.static(path.join(__dirname1, "/client/build")));

  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname1, 'client', 'build', 'index.html'));
  
  })

}else{
  app.get("/",(req,res) =>{
    res.send("API is Running Successfully");
  })
}


// Routes
app.use("/api",userRouter)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
