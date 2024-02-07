import { AppDataStore } from "../config";
import { User } from "../entities";

const usersRepository = AppDataStore.getRepository(User);

export const getUserByEmail = async(email: string): Promise<User | null> => {
	try {
        const user = await usersRepository.findOne({where : {email}});
        return user;
    } catch (e) {
		console.log(e);
		throw  e;
	}
}

export const getUserByName = async(name: string): Promise<User | null> => {
	try {
        const user = await usersRepository.findOne({where : {name}});
        return user;
    } catch (e) {
		console.log(e);
		throw  e;
	}
}

export const getUserById = async(id: string): Promise<User | null>  => {
	try {
        const user = await usersRepository.findOne({where : {id}});
        return user;   

    } catch (e) {
		console.log(e);
		throw  e;
	}
}
