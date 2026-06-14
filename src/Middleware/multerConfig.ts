import multer,{Multer, StorageEngine} from "multer";
import {Request,Express} from "express";
import { error } from "node:console";
import path from "node:path";
export const storage:StorageEngine = multer.diskStorage({
    destination : function(req:Request,file:Express.Multer.File,cb:any){
      
      const allowedFiles = ['image/jpg','image/jpeg','image/png'];
      if(!allowedFiles.includes(file.mimetype)){
       
        cb(new Error("this file is not allowed"),"");
        return;
      }
      
      cb(null, path.join(process.cwd(), "src/storage"));
    },

    filename : function(req:Request,file:Express.Multer.File,cb:any){
      cb(null,Date.now()+"-"+file.originalname);
    }
})

const upload = multer({storage:storage})

export default upload