import express,{Router} from 'express'
import ProductController from '../Controllers/productController'
import upload from "../Middleware/multerConfig"
import authMiddleware,{Role} from '../Middleware/authMiddleware';

const router : Router = express.Router();

router.route("/")
.post(
  authMiddleware.isAuthenticated,
  authMiddleware.restrictTo(Role.Admin),
  upload.single('image'),
  ProductController.addProduct
)
.get(ProductController.getProduct);


export default router