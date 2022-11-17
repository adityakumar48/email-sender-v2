const express = require("express");
const router = express.Router();
const mailer = require("nodemailer");
const userSchema = require("../models/user");
const axios = require("axios");

// Transporter Function
let transporter = mailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPASSWORD,
    },
  });
  



function SendMail(){
  // For Checking Server Running or not
  setInterval(() => {console.log(`Running at ${new Date()}`)}, 10000);
  // Time Interval 

    setInterval(function () {
      console.log()
      // Api Fetch
        axios
      .get("https://programming-quotes-api.herokuapp.com/quotes/random")
      .then(async(resp) => {

        // Fetching Data from mongodb
            const users =  await userSchema.find()

            // loop for all emails access separately and send mail
            for (let i = 0; i < users.length;i++) {
              // loop Delay function
              
              await new Promise((resolve) => setTimeout(resolve, 2000));
              // Mail Options
            let messageOb = {
                from: process.env.EMAIL,
                to: users[i].email,
                subject: `${users[i].name} - Today Quote`,
                html: `<h4><strong>${resp.data.en}</strong><h4>
              
              Author: ${resp.data.author}
              `,
              };              

              // Sending Mail

              transporter.sendMail(messageOb, (error, info) => {

                  if (error) {
                    console.log(error);
                    console.log("Failed");
                  } else {
                    console.log(`Email Sent Successfully ${i}`);
                  }
                });
            }
      }); 

    }, 21600000);
   
}


router.post("/send",(req,res)=>{

    SendMail()
  // function called
    res.send({"message":"Mail Sending Function Called"})
})

router.get("/", async(req,res)=>{
  // Sample Route
    // const users =  await userSchema.find()
    res.send(`Route Work Successfully`)
})

router.post("/save",async(req,res)=>{

  const {name,email} = req.body

  if(!name || !email){
    res.send({"message":"Please Enter Name and Email"})
  }
 
  userSchema.findOne({email:email},async(err,user)=>{
    if(user){
      res.send({"message":"User Already Exists"})
    }
    else{
      const newUser = new userSchema({
        name,
        email
      })
      await newUser.save(
      err=>{
        if(err){
          res.send(err);
        }else{
          res.send({"message":"User Saved Successfully"})
        }
      }
      )
      console.log("User Created") 
    }
  })


   
    
})

module.exports = router;