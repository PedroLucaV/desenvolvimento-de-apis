import { Router } from "express";
import { listUser, registerUser } from "../controllers/userController.js";
import validarUsuario from "../helpers/validateUser.js";

const router = Router();

router.post('/register', validarUsuario, registerUser);
router.get('/', listUser);

export default router;