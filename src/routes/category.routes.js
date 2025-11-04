import { Router } from "express";
import { categoryController } from "../controllers/category.controller.js";

const controller = new categoryController()

const router = Router()

router.get("/get-all", controller.getAll)

export default router