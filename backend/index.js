const connectToMongo = require('./db');
const express = require('express');
const errorMiddleware=require("./Middleware/Error");
const cookieparser=require("cookie-parser")
const dotenv=require("dotenv");
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const path= require("path")
const fileUpload = require("express-fileupload");

connectToMongo();


const app = express();


dotenv.config({path:"backend/Config/config.env"});
const port=process.env.PORT;


app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    useTempFiles: true, // Required for Cloudinary
    tempFileDir: "/tmp/", // Temporary directory to store files before uploading to Cloudinary
  })
);


// app.use(express.json({ limit: '50mb' })); 
// app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(cookieparser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(cookieparser());

app.use(cors({
    origin: 'http://localhost:3000', // frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow needed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Include headers
  }));

//Available Routes 

app.use('/api/auth', require("./Routes/UserRoute"));
app.use('/api/admin', require("./Routes/clubRoute"));
app.use('/api/clubevent', require("./Routes/eventRoute"));
app.use('/api/packages', require("./Routes/packagesRoute"));
app.use('/api/payment', require("./Routes/stripeRoute"));
app.use('/api/Members', require("./Routes/PremiumMemberRoute"));

//Middleware for error
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

