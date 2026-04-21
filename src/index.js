// require ('dotenv').config({path: './env'})
import dotenv from "dotenv"

import mongoose from "mongoose"
import {DB_NAME} from "./constants.js"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=> {
        console.log(`server is running at port : ${process.env.PORT}`);
        
    })
})
.catch((err) =>{
    console.log("mongodb connection failed", err);
    
})














































/*database connection - approch 1
;(async ()=>{
    try {
       await mongoose.connect('${process.env.MONGODB_URL}/${DB_NAME}')
       app.on("error", (error)=>{
        console.log("ERRR", error );
        throw error
       })

       app.listen(process.eventNames.prototype,()=>{
        console.log(`App is listening on port ${process.env.PORT}`);
        
       })
    } catch (error) {
        console.log( "ERROR",error);
        throw err
    }
})() */