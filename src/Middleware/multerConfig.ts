import multer,{StorageEngine} from "multer";
import { error } from "node:console";
import path from "node:path";
export const storage:StorageEngine = multer.diskStorage({
    destination : function(req,file,cb){
      
      const allowedFiles = ['image/jpg','image/jpeg','image/png'];
      if(!allowedFiles.includes(file.mimetype)){
       
        cb(new Error("this file is not allowed"),"");
        return;
      }
      
      cb(null, path.join(process.cwd(), "src/storage"));
    },

    filename : function(req,file,cb){
      cb(null,Date.now()+"-"+file.originalname);
    }
})

const upload = multer({storage:storage})

export default upload