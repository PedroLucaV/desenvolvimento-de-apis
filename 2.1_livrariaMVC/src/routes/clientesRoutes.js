import { Router } from "express";
import { pegarClientes, criarCliente, editarCliente, deletarCliente } from "../controllers/clientesController.js";

const router = Router();

router.get('/', pegarClientes);
router.post('/', criarCliente);
router.put('/:id', editarCliente);
router.delete('/:id', deletarCliente);

export default router;