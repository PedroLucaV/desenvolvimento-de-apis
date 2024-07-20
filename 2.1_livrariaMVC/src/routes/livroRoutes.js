import { Router } from "express";
import {pegarLivros } from "../controllers/livrosController.js";

const router = Router();

router.get('/', pegarLivros)

export default router;