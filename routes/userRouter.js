const { json } = require("express");
const path = require("path")
const router = require("express").Router();
const User = require("../models/userModel")
const bcrypt=require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("../middleWare/auth");
const multer = require('multer');
const parser = require("../middleWare/cloudinary.config");




router.post("/register", async (req, res) => {
    try {

    let {email, password, passwordCheck, displayName} = req.body;

    if(!email || !password || !passwordCheck)
    return res.status(400).json({msg: "Not all fields have been entered"} )

    if(password.length< 5)
    return res.status(400).json({msg: "Incomplete password"} )

    if(password !== passwordCheck)
    return res.status(400).json({msg: "password doesn't match"} )

     const existingUser = await User.findOne({email: email})
     if (existingUser)
     return res.status(400).json({msg: "Account with this email already exists"} )

     if (!displayName) displayName=email

     const salt = await bcrypt.genSalt()
     const passwordHash = await bcrypt.hash(password, salt)
     
     const newUser = new User({
         email,
         password: passwordHash,
         displayName
     })

     const savedUser = await newUser.save();
     res.json(savedUser) 

   } catch (err){
       res.status(500).json({err: err.message})
   }

});

  router.post("/login", async (req, res) => {
      try{
        const {email, password} = req.body
        if (!email || !password)
        return res.status(400).json({msg: "Not all fields have been entered"} )

        const user = await User.findOne({email: email})
        if (!user)
          return res
          .status(400)
          .json({msg: "No account with this email has been registered"})

          const isMatch= await bcrypt.compare(password, user.password)
          if (!isMatch)
          return res
          .status(400)
          .json({msg: "Invalid login data"})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        res.json({
            token,
            user: {
              id: user._id,
              displayName:user.displayName
            }
        })
      } catch (err){
        res.status(500).json({err: err.message})
    }
  })


  router.delete("/delete", auth, async (req, res) => {
     try{
       const deletedUser = await User.findByIdAndDelete(req.user)
       res.json(deletedUser)
       console.log(deletedUser);
     } catch (err){
      res.status(500).json({error: err.message})
  }
  });

  router.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token")
      if (!token) return res.json(false)

     const verified = jwt.verify(token, process.env.JWT_SECRET)
     if (!verified) return res.json(false);

      const user = await User.findById(verified.id);
      if (!user) return res.json(false);

      return res.json(true)
      } catch (err){
        res.status(500).json({err: err.message})
    }
  })




  router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user)
    
    res.json({
      displayName: user.displayName,
      id: user._id,
      imageUrl: user.imageUrl
    });
  })

 

  router.get("/getLatest/:id", async (req, res) => {
    try {
     const user= await User.findById(req.params.id)
     console.log(user);
     res.json({
      displayName: user.displayName,
      id: user._id,
      imageUrl: user.imageUrl
    });
    } catch (error) {
      console.log(error);
    }
  })

  
router.post("/upload/:id", parser.single("image"),  async (req, res) => {
  try {
     User.findByIdAndUpdate(req.params.id, {$set: {imageUrl: req.file.path}}, {new: true},
      (err, result) => {
        if(err){
          return res.status(400).json({error: "Failed"})
        }
        console.log(result);
        res.json(result)
      }
          
      )
     
  } catch (error) {
    console.log(error);
  }


})






module.exports=router





// router.post("/image", parser.single("image"),  async (req, res) => {
//   try {
//     const newImage = new User({
//       imageUrl: req.file.path
//     });
//     console.log(req.file);
//     await newImage.save();
//     res.json(newImage.imageUrl);
//   } catch (err) {
//     console.error('Something went wrong', err);
//   }
// })

  
