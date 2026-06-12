import { Request,Response } from "express";
import User from "../Database/models/userModel";

class AuthController{
  public static async registerUser(req:Request,res:Response):Promise<void>{

    const {username,email,password}  = req.body;

    if(!username|| !email || !password){
      res.status(400).json({
        message : "please provide username,email and password"
      })
      return
    }

    await User.create({
      username,
      email,
      password
    })

    res.status(201).json({
      message : "User registered successfully"
    })

  }
}

export default AuthController