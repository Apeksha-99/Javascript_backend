import {asynchandler} from "../utils/asynchandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudnary} from "../utils/Cloudnary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asynchandler(async(req,res) =>{
const {fullname, email, username, password } = req.body
console.log("email: ", email);

// validation
if(
    [fullname, email, username, password].some((field)=>field?.trim()=== "")
)
{
    throw new ApiError(400, "All field are require")
}

//checking if user exist or not
 const existedUser = User.findOne({
  $or: [ { email },{ username }]
})
 if(existedUser){
    throw new ApiError(409,"User with email or username already exists")
 }

 //handling the files
 const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage?.path;

if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required")
}
//uploading images on cloudnary.
const avatar = await uploadOnCloudnary(avatarLocalPath);
const coverImage = await uploadOnCloudnary(coverImageLocalPath);

if(!avatar){
    throw new ApiError(400, "Avatar file is required")
}

//creating object for the database entry
const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
})
const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
)
if(!createdUser){
    throw new ApiError(500, "something went wrong while registering the user")
}

//returning the response
return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully")
)


})






export {registerUser}