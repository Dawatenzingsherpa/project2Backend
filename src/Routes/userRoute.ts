import express,{ Router } from "express";
import AuthController from "../Controllers/userController";

const router:Router = express.Router();

router.route("/register")
.post(AuthController.registerUser);

export default router