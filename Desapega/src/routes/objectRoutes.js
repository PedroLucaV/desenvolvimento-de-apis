import { Router } from "express";
import {createObject, getAllObjectUser} from '../controllers/objectControllers.js'
import imageUpload from "../helpers/uploadImages.js";
import verifyToken from "../helpers/verifyToken.js";

const router = Router();

router.post('/criar', verifyToken, imageUpload.array("imagens", 6), createObject);
router.get('/usuarios', verifyToken, getAllObjectUser)

export default router;