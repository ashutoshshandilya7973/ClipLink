import express from "express";
import type { NextFunction, Request,Response } from "express";
import cors from "cors"



const app = express();
app.use(express.json());
app.use(cors())

import { router as userRouter } from "./routes/user.route.js";

app.use("/api/v1/user",userRouter)
app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
     console.log("error comes at the global handler")
     console.log(err)
     return res.status(500).send(err)
})

export {app}

