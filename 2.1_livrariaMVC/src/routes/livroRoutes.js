import { Router } from "express";
import { pegarLivros, criarLivro, editarLivro, deletarLivro, pegarLivroPorId, pegarLivroPorNome } from "../controllers/livrosController.js";

const router = Router();

router.get('/', pegarLivros);
router.post('/', criarLivro);
router.put('/:id', editarLivro);
router.delete('/:id', deletarLivro);
router.get('/:id', pegarLivroPorId);
router.get('/:nome', pegarLivroPorNome);

export default router;