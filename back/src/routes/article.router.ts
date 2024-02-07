import { Router } from "express";
import { 
    getFilterArticles,
    addArticle,
    deleteArticle,
    updateArticle,
} from "../controllers";

const router = Router();

router.get('/', getFilterArticles); 
router.post('/', addArticle);
router.delete('/:id',deleteArticle);
router.put('/:id',updateArticle);

export default router;