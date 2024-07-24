import { Router } from "express";
import { criarOnibus, listarOnibus, listarOnibusPorId } from "../controllers/onibusController.js";

const router = Router();

router.post('/', criarOnibus);
router.get('/:id', listarOnibusPorId);
router.get('/', listarOnibus);

export default router;