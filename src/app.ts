import express,{Application,Request,Response}  from "express";
const app:Application = express();
const PORT:number = 3000;
require("./Model/index.ts")

app.get("/",(req:Request,res:Response)=>{
  res.send("hello world");
});

app.get("/about",(req:Request,res:Response)=>{
  res.send("about page");
})

app.get("/contact",(req:Request,res:Response)=>{
  res.send("contact page");
})

app.listen(PORT,()=>{
  console.log("Server has started at port",PORT);
})