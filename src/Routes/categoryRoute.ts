import express,{Router} from 'express'
import CategoryController from '../Controllers/categoryController';
import authMiddleware, { Role } from '../Middleware/authMiddleware';

const router : Router = express.Router();

router.route("/").post(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),CategoryController.addCategory)
.get(CategoryController.getCategory)
router.route("/:id")
.get(CategoryController.getSingleCategory)
.patch(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),CategoryController.updateCategory)
.delete(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),CategoryController.deleteCategory);

export default router