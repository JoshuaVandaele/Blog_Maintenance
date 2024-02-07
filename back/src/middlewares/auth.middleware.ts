import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppDataStore } from "../config";
import { User } from "../entities";
import { UserToken } from "../models/userToken.model";

declare global {
    namespace Express {
      interface Request {
        user: UserToken;
      }
    }
  }

export const isAuth = async (request : Request, response : Response, next : NextFunction) => {
    try {
        console.log("middleware");
        // On va récupérer le repository des utilisateurs
        const usersRepository = AppDataStore.getRepository(User);

        // On récupère le token dans l'entête de la requête
        const token = request.headers.authorization.split(' ')[1];
 
        // Si le token n'existe pas on retourne sur une erreur 401
        if (!token) {
            return response.status(401).send("Unauthorized");
        }

        // On va vérifier le token à partir de la clé secrète et on va récupérer l'id de l'utilisateur
        const userToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET) as JwtPayload;

        // On va vérifier que l'utilisateur existe bien dans la base
        const user = await usersRepository.findOne({where : { id : userToken.id }});

        if (!user) {
            return response.status(401).send("Unauthorized");
        }

        request.user = userToken as UserToken;

        // Pas de soucis, on continue
        return next();

    } catch (error) {
        // Erreur sur le programme on retourne une erreur http 500
        return response.status(500).send("Server Error");
    }
}