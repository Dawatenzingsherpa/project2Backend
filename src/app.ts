import express,{Application,Request,Response}  from "express";
const app:Application = express();
const PORT:number = 3000;
import * as dotenv from 'dotenv'
dotenv.config();
import "./Database/connection"
// require("./Model/index.ts")
import userRoute from "./Routes/userRoute";
import productRoute from "./Routes/productRoute"
import path from "node:path";
import adminSeeder from "./adminSeeder";
import categoryController from "./Controllers/categoryController";
import categoryRoute from "./Routes/categoryRoute"
import cartRoute from './Routes/cartRoute'
import orderRoute from './Routes/orderRoute'


app.use(express.json());
app.get("/",(req,res)=>{
  res.send("hello world");
})


app.use("",userRoute);
app.use("/admin/product",productRoute);
app.use("/admin/category",categoryRoute);
app.use("/customer/cart",cartRoute);
app.use("/order",orderRoute)



app.use(express.static(path.join(process.cwd(), "src/storage")));



adminSeeder();


app.listen(PORT,()=>{
  categoryController.seedCategory();
  console.log("Server has started at port",PORT);
})