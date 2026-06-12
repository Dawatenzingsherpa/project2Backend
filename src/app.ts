import express,{Application,Request,Response}  from "express";
const app:Application = express();
const PORT:number = 3000;
import * as dotenv from 'dotenv'
dotenv.config();
import "./Database/connection"
// require("./Model/index.ts")
import userRouter from "./Routes/userRoute";

app.use(express.json());
app.get("/",(req,res)=>{
  res.send("hello world");
})

app.use("",userRouter)



app.listen(PORT,()=>{
  console.log("Server has started at port",PORT);
})