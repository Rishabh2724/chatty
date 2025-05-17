import express from "express";
import { authUser } from "../middlewares/authUser.js";
import {getUsers,getMessages,sendMessage} from "../controllers/message.controller.js"
const router = express.Router();

router.get('/users', authUser, getUsers)
router.get('/:_id', authUser, getMessages)
router.post('/send/:_id', authUser , sendMessage)
export default router;
