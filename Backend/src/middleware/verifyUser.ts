import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

const verifyUser=asyncHandler(async(req,res,next)=>{
      const accessToken=req.cookies
      
})