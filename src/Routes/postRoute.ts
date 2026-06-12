import express,{Router} from 'express'
import PostController from '../Controllers/postController'
import upload from "../Middleware/multerConfig"

const router : Router = express.Router();

router.route("/post")
.post(upload.single('image'),PostController.createPost);

export default router