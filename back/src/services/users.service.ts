import { AppDataStore } from "../config";
import { User } from "../entities";

const usersRepository = AppDataStore.getRepository(User);

/**
 * la fonction getUserByEmail permet de récupérer un utilisateur par son adresse email
 * @param email email de l'utilisateur
 * @returns l'utilisateur
 */
export const getUserByEmail = async(email: string): Promise<User | null> => {
	try {
		// On récupère l'utilisateur par son adresse email
        const user = await usersRepository.findOne({where : {email}});
        return user;
    } catch (e) {
		console.log(e);
		throw  e;
	}
}
/**
 * la fonction getUserByName permet de récupérer un utilisateur par son nom
 * @param name nom de l'utilisateur
 * @returns l'utilisateur 
 */
export const getUserByName = async(name: string): Promise<User | null> => {
	try {
        const user = await usersRepository.findOne({where : {name}});
        return user;
    } catch (e) {
		console.log(e);
		throw  e;
	}
}
/**
 * la fonction getUserById permet de récupérer un utilisateur par son id
 * @param id id de l'utilisateur
 * @returns l'utilisateur
 */
export const getUserById = async(id: string): Promise<User | null>  => {
	try {
        const user = await usersRepository.findOne({where : {id}});
        return user;   

    } catch (e) {
		console.log(e);
		throw  e;
	}
}
