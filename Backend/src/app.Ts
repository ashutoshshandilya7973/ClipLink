import express from "express";
import type { Request,Response } from "express";
import cors from "cors"



const app = express();
app.use(express.json());
app.use(cors())

app.get("/", (req: Request, res: Response) => {
  res.send("Hello TypeScript + Express! with hlw ashutosh ");
});

app.use("*",(err,req,res,next)=>{
     
})

export {app}

