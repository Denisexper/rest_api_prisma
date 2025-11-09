import { Router } from "express";
import { usersController } from "../controllers/users.controller.js";


const controller = new usersController()

const router = Router()

router.get("/get-all", controller.getAll)
router.get("/get-user/:id", controller.getUser)
router.post("/create-user", controller.createUser)
router.put("/update-user/:id", controller.updateUser)
router.delete("/delete-user/:id", controller.deleteUser)

export default router