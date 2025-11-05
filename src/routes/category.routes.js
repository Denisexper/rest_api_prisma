import { Router } from "express";
import { categoryController } from "../controllers/category.controller.js";

const controller = new categoryController()

const router = Router()

router.get("/get-all", controller.getAll)
router.get("/get-category/:id", controller.getCategory)
router.post("/create", controller.createCategory)
router.put("/update-category/:id", controller.updateCategory)
router.delete("/delete-category/:id", controller.deleteCategory)

export default router