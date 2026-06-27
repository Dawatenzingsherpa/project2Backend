import express,{Router} from 'express'
import authMiddleware, { Role } from '../Middleware/authMiddleware';
import errorHandler from '../services/catchAsyncError';
import orderController from '../Controllers/orderController';


const router : Router = express.Router();


router.route("/")
.post(authMiddleware.isAuthenticated,errorHandler(orderController.createOrder))
router.route("/customer")
.get(authMiddleware.isAuthenticated,orderController.fetchMyOrder)

router.route("/verify")
.post(authMiddleware.isAuthenticated,errorHandler(orderController.verifyTransaction))

router.route("/:orderId")
.get(authMiddleware.isAuthenticated,errorHandler(orderController.fetchOrderDetail))


router.route("/admin/:orderId")
.patch(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),errorHandler(orderController.changeOrderStatus))
.delete(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),errorHandler(orderController.deleteOrder))

router.route("/admin/payment/:orderId")
.patch(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),errorHandler(orderController.changePaymentStatus))

router.route("/customer/cancel/:orderId")
.get(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Customer),errorHandler(orderController.cancelMyOrder))


export default router