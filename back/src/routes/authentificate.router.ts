import express,{ Router } from "express";
import { authenticateUser, forgotPasswordUser } from "../controllers/users.controller";

const router = Router();

router.use(express.urlencoded({ extended: false }));
router.post('/',authenticateUser)
router.post('/forgot-password', forgotPasswordUser);

export default router;