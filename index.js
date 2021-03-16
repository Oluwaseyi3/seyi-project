require("dotenv").config();
const express = require("express");
const bcrypt=require("bcryptjs")
const cors = require("cors");
const mongoose = require("mongoose");
const morgan= require("morgan")
const bodyParser = require("body-parser")

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(
    bodyParser.urlencoded({
     extended: true
    })
)

app.use(express.urlencoded({limit: "50mb", extended: true}))


mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if (err) throw err
    console.log("MongoDB1 Connected");
})

app.use("/users", require("./routes/userRouter"))



const PORT = process.env.PORT || 5000;
// let port = process.env.PORT;

//     // ... other app.use middleware 
// app.use(express.static(path.join(__dirname, "client", "build")))

// ...
// Right before your app.listen(), add this:

if(process.env.NODE_ENV==="production"){
  app.use(express.static("client/build"))
  const path = require("path")
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


  
app.listen(PORT, () => console.log(`The Server has started on port: ${PORT}`));





// app.listen(port, function(){
//  console.log("Server has started on Port 3000")
// });