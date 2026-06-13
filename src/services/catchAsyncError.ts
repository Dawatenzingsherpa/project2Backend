import { Request,Response,NextFunction } from "express";

const errorHandler = (fn:Function)=>{
  return (req:Request,res:Response)=>{
    fn(req,res).catch((error:Error)=>{
      return res.status(500).json({
        message : "Internal Error",
        errorMessage : error.message
      })
    })
    
  }
}

export default errorHandler