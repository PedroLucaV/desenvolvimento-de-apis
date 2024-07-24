import { Router } from "express";
import { criarLinha, editarLinha, listarLinhaId, listarLinhas } from "../controllers/linhasController.js";

const router = Router();

router.post('/', criarLinha);
router.get('/', listarLinhas);
router.get('/:id', listarLinhaId);
router.put('/:id', editarLinha);

export default router;