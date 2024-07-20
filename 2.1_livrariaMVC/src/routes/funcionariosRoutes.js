import { Router } from "express";
import { pegarFuncionarios, criarFuncionario, editarFuncionario, deletarFuncionario, pegarFuncionarioPorId } from "../controllers/funcionariosController.js";

const router = Router();

router.get('/', pegarFuncionarios);
router.post('/', criarFuncionario);
router.put('/:id', editarFuncionario);
router.delete('/:id', deletarFuncionario);
router.get('/:id', pegarFuncionarioPorId);

export default router;