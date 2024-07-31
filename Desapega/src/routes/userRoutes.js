import { Router } from "express";
import { loginUser , registerUser } from "../controllers/userController.js";
import validarUsuario from "../helpers/validateUser.js";

const router = Router();

router.post('/register', validarUsuario, registerUser);
router.post('/login', loginUser);

export default router;