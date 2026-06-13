import express,{Application,Request,Response}  from "express";
const app:Application = express();
const PORT:number = 3000;
import * as dotenv from 'dotenv'
dotenv.config();
import "./Database/connection"
// require("./Model/index.ts")
import userRouter from "./Routes/userRoute";
import postRouter from "./Routes/postRoute"
import path from "node:path";

app.use(express.json());
app.get("/",(req,res)=>{
  res.send("hello world");
})

app.use("/",postRouter);

app.use("",userRouter);


app.use(express.static(path.join(process.cwd(), "src/storage")));





app.listen(PORT,()=>{
  console.log("Server has started at port",PORT);
})