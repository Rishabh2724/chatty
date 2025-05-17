import express from "express";
import { login, logout, signup, updateProfile ,checkAuth} from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/authUser.js";
const router = express.Router();


router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.put("/update-profile",authUser,updateProfile)
router.get("/check", authUser , checkAuth);
export default router;