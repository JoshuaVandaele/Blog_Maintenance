import router from "@/router";
import { useUserStore } from '@/store/user';

export const authentificationGuard = () => {
    const UserStore = useUserStore();

    // Si on n'est pas authentifié, on redirige vers la page de login
    if (!UserStore.isLogged) {
        router.push('/connexion');
    }

    return true;
}