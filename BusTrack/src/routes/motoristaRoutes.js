import { Router } from "express";
import { criarMotorista, listarMotoristas, listarMotoristasPorId, deletarMotorista } from "../controllers/motoristaController.js";

const router = Router();

router.post('/', criarMotorista);
router.delete('/:id', deletarMotorista);
router.get('/:id', listarMotoristasPorId);
router.get('/', listarMotoristas);

export default router;