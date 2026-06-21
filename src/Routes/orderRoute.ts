import express,{Router} from 'express'
import authMiddleware, { Role } from '../Middleware/authMiddleware';
import errorHandler from '../services/catchAsyncError';
import orderController from '../Controllers/orderController';


const router : Router = express.Router();


router.route("/").post(authMiddleware.isAuthenticated,errorHandler(orderController.createOrder))


export default router