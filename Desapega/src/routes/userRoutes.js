import { Router } from "express";
import { listUser, registerUser } from "../controllers/userController.js";

const router = Router();

router.post('/register', registerUser);
router.get('/', listUser);

export default router;