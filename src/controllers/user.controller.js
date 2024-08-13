import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend (currently we can take from Postman since we don't have frontend yet)
  //validation - not empty (to check if every field is in correct form as per User Model)
  //check if user already exists: username, email
  //check for images, check for avatar
  //upload them to cloudinary, then cloudinary returns a response, get the url from the response
  //check if avatar is successfully uploaded on cloudinary

  //till now, user provided us a data, we took an image, uploaded on cloudinary, cloudinary returned URL (url of image),
  //now we need to create a user object

  // create a user object (preferred to upload NoSQL data on MongoDB) - create entry in db(creation call in mongoDB)
  // we get as it is response as the data we stored in db, we need to send this response to frontend, but we don't want to send encrypted password to frontend
  // remove password and refreshToken field from response
  // check for user creation(check if we received valid response)
  //return response or if there is no response, return null

  //user details are in req.body object(later we can extract data from it & destructure it) if data is coming from form/json in frontend

  const { username, email, password, fullname } = req.body;
  console.log(username, email, fullname, password);
  //we will upload avatar & coverImage files on local server using multer middleware in user.routes.js just before applying registerUser method on it

  // if (fullname === "") {
  //   throw new ApiError(400, "fullname is required");
  // }
  //Like above if, we have to check all the fields, so we will do smart work
  // we will write all fields in array & then apply method "some" on it to check the condition on each array element

  if (
    [fullname, username, email, password].some((field) => {
      return field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //check if user already exists
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  //User.findOne() returns the fist user found
  //we will find user who either has email or username same as we received from frontend, then
  //that means user already in db, can't let them use the same username or email again

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  //Express.js gives us access of "req.body",
  //multer gives us access of "req.files"
  //here we have multiple files ie. avatar, coverImage

  const avatarLocalPath = req.files?.avatar[0]?.path;

  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  //check for avatar
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  //upload on cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowercase(),
  });

  //check if user created in db
  const createdUser = await User.findById(user._id)?.select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  //send the createdUser in response
});

return res
  .status(201)
  .json(new ApiResponse(200, createdUser, "User registered successfully"));

export { registerUser };

//when will this method Run?
//this method will run when some URL(routes) will be hit
