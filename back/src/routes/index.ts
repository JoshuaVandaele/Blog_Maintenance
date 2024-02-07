import express,{ Router } from "express";
import useUsersRouter from "./user.router";
import useArticlesRouter from "./article.router";
import useAuthentificateRouter from "./authentificate.router";
import { isAuth } from "../middlewares/auth.middleware";

const router = Router();
router.use(express.urlencoded({ extended: false }));
router.use('/connexion', useAuthentificateRouter);
router.use('/users', useUsersRouter);
router.use('/articles', isAuth, useArticlesRouter);

export default router;