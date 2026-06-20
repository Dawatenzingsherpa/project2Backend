import express,{Router} from 'express'
import authMiddleware, { Role } from '../Middleware/authMiddleware';
import CartController from '../Controllers/cartController';

const router : Router = express.Router();

router.route("/")
.post(authMiddleware.isAuthenticated,CartController.addToCart)
.get(authMiddleware.isAuthenticated,CartController.getMyCart)

router.route("/:productId")
.patch(authMiddleware.isAuthenticated,CartController.updateMyCartItem)
.delete(authMiddleware.isAuthenticated,CartController.deleteMyCartItem)



export default router