import { Router } from "express";
import { pegarLivros, criarLivro, editarLivro, deletarLivro, pegarLivroPorId, pegarLivroPorNome } from "../controllers/livrosController.js";

const router = Router();

router.get('/', pegarLivros);
router.post('/', criarLivro);
router.put('/:id', editarLivro);
router.get('/porNome', pegarLivroPorNome);
router.delete('/:id', deletarLivro);
router.get('/:id', pegarLivroPorId);

export default router;