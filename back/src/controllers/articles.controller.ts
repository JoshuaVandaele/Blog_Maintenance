import { Request, Response } from 'express';
import { Article, User } from '../entities';
import { AppDataStore } from '../config';
import Res from '../helpers/res.helper';
import { ArticleDto } from '../models/articleDto.model';
import { FindOptionsWhere, ILike } from 'typeorm';

/**
 * Le fonction getFilterArticles permet de récupérer les articles en fonction des filtres donnés
 * @param req la requête reçus (titre, contenu, auteur, isArticlesMe)
 * @param res la reponse à renvoyer
 * @returns 
 */
export const getFilterArticles = async (req : Request, res : Response) => {
    try {
        const articlesRepository = AppDataStore.getRepository(Article);
 
        let where: FindOptionsWhere<any> = {
                title: ILike('%' + req.query.title + '%'),
                content: ILike('%' + req.query.content + '%'),
                author: {
                    name: ILike('%' + req.query.author + '%'),
                    id: req.query.isArticlesMe === 'true'
                    ? req.user.id
                    : null,
                },
        }

        // On fait le lien avec la classe auteurs en appliquant les filtres
        const articles = await articlesRepository.find({
            relations: ["author"],
            where
        });             
        
        // On transforme les articles en dictionnaire
        const articlesDto: ArticleDto[] = articles.map((article) => ({...article, author: article.author.name, 
            isArticleMe: article.author.id === req.user.id}));
        
        return Res.send(res,200,'Success', articlesDto);
    } catch (error) {
        return Res.send(res,500,'Erreur interne du serveur');
    }
};

/**
 *  fonction qui ajoute un article a la base de données
 * @param req la requête reçus (titre, contenu)
 * @param res 
 * @returns 
 */
export const addArticle = async (req: Request, res: Response) => {
    try {
        // recuperer la table des articles
        const articlesRepository = AppDataStore.getRepository(Article);

        const { title, content, categorie } = req.body;

        // on la table des utilisateurs
        const usersRepository = AppDataStore.getRepository(User);

        const author = await usersRepository.findOne({where : {
            id : req.user.id
        }});

        // on cree un nouvel article
        const newArticle = articlesRepository.create({
            title: title,
            content: content,
            categorie: categorie,
            author,
            date: new Date()
        });
        
        // on le sauvegarde dans la base de données
        await articlesRepository.save(newArticle);

        const articleDto: ArticleDto = {...newArticle, author: newArticle.author.name, isArticleMe: true};

        return Res.send(res, 200, "Article créé avec succès", articleDto);
    } catch (error) {
        console.error(error);
        return Res.send(res, 500, "Erreur interne du serveur");
    }
};

/**
 * La fonction updateArticle permet de mettre à jour un article de la base de données
 * @param req la requête reçus (titre, contenu, date)
 * @param res 
 * @returns 
 */

export const  updateArticle = async(req: Request, res: Response)=> {
    const articlesRepository = AppDataStore.getRepository(Article);

    const articleId = req.params.id;

    let article = await articlesRepository.findOne({
        relations: ["author"],
        where : {
        id: articleId
    }});

    if (!article) {
        return Res.send(res, 404, "L'article n'existe pas");
    }

    if (article.author.id !== req.user.id) {    
        return Res.send(res, 403, "Vous n'êtes pas autorisé à modifier cet article");
    }

    // l'article est modifié dans la base de données
    const updateArticle = articlesRepository.update(articleId, req.body);

    article = await articlesRepository.findOne({where : {
        id : req.params.id
    }});

    res.json(article);
}
/**
 * la fonction permet de supprimer un article de la base de données
 * @param req 
 * @param res 
 * @returns 
 */
export const deleteArticle = async (req: Request, res: Response) => {
    try {
        console.log('delete article');
        const articlesRepository = AppDataStore.getRepository(Article);

        const { id } = req.params;

        const article = await articlesRepository.findOne({
            relations: ["author"],
            where : {
            id
        }});

        if (!article) {
            return Res.send(res, 404, "L'article n'existe pas");
        }

        if (article.author.id !== req.user.id) {    
            return Res.send(res, 403, "Vous n'êtes pas autorisé à supprimer cet article");
        }

        await articlesRepository.delete({id});
        return Res.send(res, 204, "Article supprimé avec succès");

    } catch (error) {
        return Res.send(res,500, "Erreur interne du serveur");
    }
};