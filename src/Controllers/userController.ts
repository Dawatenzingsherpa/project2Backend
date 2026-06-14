import { Request,Response } from "express";
import User from "../Database/models/userModel";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class AuthController{
  public static async registerUser(req:Request,res:Response):Promise<void>{

    const {username,email,password,role}  = req.body;

    if(!username|| !email || !password){
      res.status(400).json({
        message : "please provide username,email and password"
      })
      return
    }
    const [data] = await User.findAll({
      where : {
        email : email
      }
    })
    console.log(data);
    if(data){
      res.status(404).json({
        message : "Email Already Registered"
      })
      return
    }

    await User.create({
      role : role && role,
      username,
      email,
      password : bcrypt.hashSync(password,8)
    })

    res.status(201).json({
      message : "User registered successfully"
    })

  }

  public static async loginUser(req: Request,res:Response):Promise<void>{
    //user input 
    const {email,password} = req.body;
    if(!email || !password){
      res.status(400).json({
        message : "please provide email and password"
      })
      return 
    }

    //check if user with above email exist or not 
    const [data] = await User.findAll({
      where : {
        email : email
      }
    })
    if(!data){
      res.status(404).json({
        message : "no user with that email"
      })
      return
    }

    //check password
    const isMatched = bcrypt.compareSync(password,data.password);

    if(!isMatched){
      res.status(403).json({
        message : "Invalid email or password"
      })
      return 
    }

    if(isMatched){
      const token = jwt.sign({id:data.id},process.env.SECRET_KEY as string,{
        expiresIn : "20d"
      })

      res.status(200).json({
        message : "Logged in successfully",
        data : token
      })
    }


  }
}

export default AuthController