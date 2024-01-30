const express = require('express');

const app =express();
//here we use cookie parser for storing toekn in cookie
//without iske bhi kr sakte hai
//load config from env
const PORT=process.env.PORT||4000; 
//middleware to parse json body request
// const cookieparser=require("cookie-parser");
app.use(express.json());
// app.use(cookieparser());
//we use a middleware express fileupload to upload fileon server
const fileUpload=require("express-fileupload");
app.use(fileUpload(
    {
        useTempFiles : true,
        tempFileDir : '/tmp/'
    }
));
//we use cloudinary.js to uploadn file on cloud
//import routes for todo api
const upload=require("./routes/FileUpload");
app.use("/api/v1/upload",upload);
//start server
app.listen(PORT,()=>{
    console.log(`server started successfully at ${PORT}`);
})
//connect database
const dbConnect=require("./config/database");
dbConnect();
//connect to cloudinary
const cloudinary=require("./config/cloudinary");
cloudinary.cloudinaryConnect();
//default route
app.get("/",(req,res)=>{
    res.send(`This is home page`);
})