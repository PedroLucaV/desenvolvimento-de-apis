import { Router } from "express";
import { pegarLivros, criarLivro } from "../controllers/livrosController.js";

const router = Router();

router.get('/', pegarLivros)
router.post('/', criarLivro)

export default router;