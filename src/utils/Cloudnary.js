import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
    api_key:process.key.CLOUDNARY_API_KEY,
    api_secret:process.env.CLOUDNARY_API_SECRET
})


const uploadOnCloudnary = async(localfilepath)=>{
 try {
    if(!localfilepath) return null;
    //upload the file on Cloudnary
     const response = await cloudinary.uploader.upload(localfilepath,{
        resource_type: "auto"
    })
    //file has been uploaded successfully
    console.log("file is uploaded on cloudnary", response.url);
    return response;
 } catch (error) {
    fs.unlinkSync(localfilepath);
    return null;
 }
}
 
export {uploadOnCloudnary}