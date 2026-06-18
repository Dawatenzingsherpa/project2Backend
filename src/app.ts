import express,{Application,Request,Response}  from "express";
const app:Application = express();
const PORT:number = 3000;
import * as dotenv from 'dotenv'
dotenv.config();
import "./Database/connection"
// require("./Model/index.ts")
import userRouter from "./Routes/userRoute";
import productRouter from "./Routes/productRoute"
import path from "node:path";
import adminSeeder from "./adminSeeder";
import categoryController from "./Controllers/categoryController";
import categoryRouter from "./Routes/categoryRoute"


app.use(express.json());
app.get("/",(req,res)=>{
  res.send("hello world");
})


app.use("",userRouter);
app.use("/admin/product",productRouter);
app.use("/admin/category",categoryRouter);



app.use(express.static(path.join(process.cwd(), "src/storage")));



adminSeeder();


app.listen(PORT,()=>{
  categoryController.seedCategory();
  console.log("Server has started at port",PORT);
})