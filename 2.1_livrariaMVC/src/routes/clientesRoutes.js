import { Router } from "express";
import { pegarClientes, criarCliente, editarCliente } from "../controllers/clientesController.js";

const router = Router();

router.get('/', pegarClientes);
router.post('/', criarCliente);
router.put('/:id', editarCliente);

export default router;