import { useUserStore } from '@/store/user';
import axios, { AxiosResponse } from 'axios';

const API_ORIGIN = "http://localhost:4000";

export const Axios = axios.create({
    baseURL: API_ORIGIN,
});


// Intercepteur pour ajout du token dans l'entete des requetes
Axios.interceptors.request.use(request => {
    const userStore = useUserStore();
    const token = userStore.getToken;

    if (token) {
        request.headers.Authorization = `Baerer ${token}`;
    }

    return request;
});

// Intercepteur pour les réponses, gestion de l'erreur 401
Axios.interceptors.response.use(response => {
    return response
}, error => {
    if (error.response.status == 401) {
        useUserStore().logout();
    }

    return Promise.reject(error);
});

export default Axios