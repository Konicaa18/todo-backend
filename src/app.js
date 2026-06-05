require("dotenv").config();
const express = require("express")
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");

const app = express()
app.use(cors());
app.use(express.json())
app.use("/api/todos",todoRoutes)
app.use("/api/auth", authRoutes);

app.get("/",(req,res)=>{
    res.send("Hello Nodemon");
})
app.post("/test",(req,res)=>{
    console.log(req.body)
    res.send("Received")
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log(error);
    });
module.exports = app