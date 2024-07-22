import { Router } from "express";
import { criarEmprestimo, listarEmprestimos } from "../controllers/emprestimosController.js";

const router = Router();

router.get('/', listarEmprestimos);

router.post('/', criarEmprestimo);

export default router