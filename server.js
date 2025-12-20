const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()
const app = express()
const {errorhandler} = require("./middlewares/errorHandler")
const connectDb = require("./config/dbConnection")
const port = 5001

connectDb()

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use(express.json())//When we are sending JSON body from client to the server, We should parse the body to get it in the server

// Additional CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get("/",(req,res)=>{
    res.send("Contact Manager is getting Ready")   //Sending Response in the Text Format
})

app.get("/json",(req,res)=>{
    res.json({Project : "Contact Manager"}) //Sending Response in the JSON Format
})

app.use("/contact" , require("./routes/contactRoutes"))
app.use("/user" , require("./routes/userRoutes"))
app.use(errorhandler)


app.listen(port,()=>{
    console.log(`Welcome to the world of mark antony ${port}`)
})