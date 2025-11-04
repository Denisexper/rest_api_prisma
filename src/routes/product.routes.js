import { Router } from "express";
import { productController } from "../controllers/product.controller.js";

const controller = new productController()

const router = Router()

router.get("/get-all", controller.getAll)
router.get("/get-product/:id", controller.getProduct)
router.post("/create", controller.createProduct)
router.delete("/delete/:id", controller.deleteProduct)
router.put("/update/:id", controller.updateProduct)
export default router;

//pnpx prisma studio// para abrir el estudio de prisma y agregar registros manualmente