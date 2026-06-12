import { Request,Response } from "express";
import Post from "../Database/models/postModel";
import { describe } from "node:test";




class PostController{
  public static async createPost(req:Request,res: Response):Promise<void>{
    console.log(req.file);
    let filename; 
    const {title,description} = req.body;
    if(req.file){
      filename = req.file.filename;
    }else{
      res.status(400).json({
        message : "file is missing"
      })
    }
    if(!title || !description){
      res.status(400).json({
        message : "please provide title and description"
      })
      return;
    }

    await Post.create({
      title,
      description,
      imageUrl : filename
    })

    res.status(201).json({
      message : "Post created successfully"
    })

  }
}

export default PostController