import express,{Application,Request,Response}  from "express";
const app:Application = express();
const PORT:number = 3000;
import * as dotenv from 'dotenv'
dotenv.config();
import "./Database/connection"
// require("./Model/index.ts")
import userRouter from "./Routes/userRoute";
import postRouter from "./Routes/productRoute"
import path from "node:path";
import adminSeeder from "./adminSeeder";


app.use(express.json());
app.get("/",(req,res)=>{
  res.send("hello world");
})


app.use("",userRouter);
app.use("/admin/product",postRouter);



app.use(express.static(path.join(process.cwd(), "src/storage")));



adminSeeder();


app.listen(PORT,()=>{
  console.log("Server has started at port",PORT);
})