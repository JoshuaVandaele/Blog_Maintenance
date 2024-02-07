import { Request, Response } from 'express';
import { Article, User } from '../entities';
import { AppDataStore } from '../config';
import Res from '../helpers/res.helper';
import { ArticleDto } from '../models/articleDto.model';
import { FindOptionsWhere, ILike } from 'typeorm';

export const getFilterArticles = async (req : Request, res : Response) => {
    try {
        const articlesRepository = AppDataStore.getRepository(Article);
 
        let where: FindOptionsWhere<any> = {
                title: req.query.title && req.query.title != ''
                    ? ILike('%' + req.query.title + '%') 
                    : null,
                content: req.query.content && req.query.content != ''
                    ? ILike('%' + req.query.content + '%') 
                    : null,
                author: {
                    name: req.query.author && req.query.author != '' 
                    ? ILike('%' + req.query.author + '%') 
                    : null,
                    id: req.query.isArticlesMe === 'true'
                    ? req.user.id
                    : null,
                },
        }

        const articles = await articlesRepository.find({
            relations: ["author"],
            where
        });             

        const articlesDto: ArticleDto[] = articles.map((article) => ({...article, author: article.author.name, 
            isArticleMe: article.author.id === req.user.id}));
        
        return Res.send(res,200,'Success', articlesDto);
    } catch (error) {
        return Res.send(res,500,'Erreur interne du serveur');
    }
};

export const addArticle = async (req: Request, res: Response) => {
    try {
        const articlesRepository = AppDataStore.getRepository(Article);

        const { title, content } = req.body;

        const usersRepository = AppDataStore.getRepository(User);

        const author = await usersRepository.findOne({where : {
            id : req.user.id
        }});

        const newArticle = articlesRepository.create({
            title: title,
            content: content,
            author,
            date: new Date()
        });
    
        await articlesRepository.save(newArticle);

        const articleDto: ArticleDto = {...newArticle, author: newArticle.author.name, isArticleMe: true};

        return Res.send(res, 200, "Article créé avec succès", articleDto);
    } catch (error) {
        console.error(error);
        return Res.send(res, 500, "Erreur interne du serveur");
    }
};


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

    const updateArticle = articlesRepository.update(articleId, req.body);

    article = await articlesRepository.findOne({where : {
        id : req.params.id
    }});

    res.json(article);
}

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