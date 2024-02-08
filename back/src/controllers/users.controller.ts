import { Request, Response } from 'express';
import { AppDataStore } from '../config';
import { User } from '../entities/user.entity';
import Res from '../helpers/res.helper';
import { validate } from "class-validator";
import { getUserByEmail, getUserByName } from '../services/users.service';
import { checkPassword, generateTokenForUser, hashPassword, sendEMailResetPasswordUser } from '../services/authentificate.service';

const jwt = require('jsonwebtoken');

    // Récupérer tous les utilisateurs
    export const getAllUsers = async (req: Request, res: Response) => {
        try {
        const userRepository = AppDataStore.getRepository(User);

        const users = await userRepository.find({});
        return Res.send(res,200,'Success',users);
    } catch (error) {
        return Res.send(res,500,'Internal Server error');
        } 
      
    }

    // Ajouter un nouvel utilisateur
    export const addUser = async(req: Request, res: Response) =>{

        const userRepository = AppDataStore.getRepository(User);
        const { name, email, password} = req.body;

        // On vérifie que l'adresse email n'est pas déjà utilisé
        let user = await getUserByEmail(email);
        console.log("user", user);
        if (user){
            return res.status(400).send("L'adresse email existe déjà");
        } 

        // On vérifie que le pseudo n'est pas déjà utiliséé
        user = await getUserByName(name);

        if (user){
            return res.status(400).send("Le pseudo est déjà utilisé");
        } 

        const passwordHash = await hashPassword(password);

        const newUser = userRepository.create({
            name : name,
            email : email,
            password: passwordHash
        });
         
        const isValidatedUser = await validate(newUser);

        if (!isValidatedUser) {
            return res.status(400).send("Utilisateur non valide");
        }

        await userRepository.insert(newUser);

        return res.status(200).send("Utilisateur créé avec succès");
    }

    export const authenticateUser = async (req : Request, res : Response) => {
        try {
            const { email, password} = req.body;

            // Si le mail ou le mot de passe ne sont pas renseignés on remonte une erreur http
            if (!email || !password) {
                return res.status(400).json({ message: 'Problème d\'authentification' });
            }

            // Vérification que l'utilisateur existe bien avec son email et mot de passe
            const user = await getUserByEmail(email);

            // Si l'utilisateur n'existe pas on remonte une erreur http
            if (!user) {
                return res.status(400).json({ message: 'Votre mot de passe ou adresse mail est erroné' });
            }
    
            // On verifie le mot de passe de l'utilisateur
            const matchPassword = checkPassword(password, user.password);

            if (!matchPassword) {
                return res.status(400).json({ message: 'Votre mot de passe ou adresse mail est erroné' });               
            }

            // On va générer un token à partir pour l'utilisateur
            const token = generateTokenForUser(user);

            // On retourne le token dans la réponse
            return  res.status(200).json({token});
            } catch (error) {
            return res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    }

    export const forgotPasswordUser  = async(req: Request, res: Response) => {
        try {
            const { email } = req.body;
  console.log("test", req.body);
            // On vérifie qu'on a bien l'email dans la requête
            if (!email) {
                return res.status(400).send("Problème avec la réinitialisation");
            }
  
            // on récupère l'utilisateur par son email
            const user = await getUserByEmail(email);

            if (!user) {
                return res.status(404).send("Le compte n'existe pas");
            }

            const hasSendMail = sendEMailResetPasswordUser(user);

            if (hasSendMail) {
                return res.status(200).send("Un email vous a été envoyé pour réinitialiser votre mot de passe");
            }
            else {
                return res.status(500).send("Erreur lors de l'envoi du mail");
            }

        } catch (error) {
            return res.status(500).send("Erreur lors du traitement d'envoi du mail");
        }
    } 
    
    export const changePasswordUser = async(req: Request, res: Response) => {
        try {
            const { password, token } = req.body;
            
            // On vérifie qu'on a bien le mot de passe et le token dans la requête
            if (!password || !token) {
                return res.status(400).send("Problème avec le changement de mot de passe");
            }
    
            changePasswordUser(req, res);
        } catch (error) {
            return res.status(500).send("Erreur lors du traitement de changement de mot de passe");
        }
    }    