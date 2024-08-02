import { Router } from "express";
import { checkUser, getUserById, loginUser , registerUser, editUser } from "../controllers/userController.js";
import verifyToken from '../helpers/verifyToken.js'
import validarUsuario from "../helpers/validateUser.js";

const router = Router();

router.post('/register', validarUsuario, registerUser);
router.post('/login', loginUser);
router.get('/checkUser/:id', checkUser);
router.get('/:id', getUserById);
router.put('/edit/:id', verifyToken, editUser);

export default router;