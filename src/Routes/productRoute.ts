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

router.route("/:id")
.get(ProductController.getSingleProduct)
.delete(authMiddleware.isAuthenticated,
  authMiddleware.restrictTo(Role.Admin),
  ProductController.deleteProduct
).patch(
  authMiddleware.isAuthenticated,
  authMiddleware.restrictTo(Role.Admin),
  upload.single('image'),
  ProductController.updateProduct
);


export default router