import { defineStore } from "pinia";
import router from "@/router";
import Axios from "@/core/api";
import { jwtDecode } from "jwt-decode";
import { User, factoryUser } from "@/models/user.model";


export interface userState {
    isLoggedUser: boolean,
    token: string | null;
    errorAuthentification: string | null;
 }

export const useUserStore = defineStore('user', {
    state: (): userState => ({
        isLoggedUser: localStorage.getItem('token') ? true : false, 
        token: localStorage.getItem('token'),
        errorAuthentification: null
    }),

    getters: {
        isLogged: (state) => state.isLoggedUser,
        getToken: (state) => state.token,
        getErrorAuthentification: (state) => state.errorAuthentification,
        getUser: (state): User | null => {
            if (state.token) {
                const decoded = jwtDecode(state.token);
                return factoryUser(decoded?.name, decoded?.email);
            }
            return null;
        }
    },
    actions: {
     connexion(email: string, password: string) {
        Axios.post("/connexion", {email, password})
              .then(response => {
                    if (response.status == 200) {
                        const token = response.data.token;
                        localStorage.setItem('token', token)
                        this.$state.errorAuthentification = null;
                        this.$state.isLoggedUser = true;
                        this.$state.token = token               ;
                        router.push('/');
                    }
              })
              .catch((error) => {
                if (error.response) {
                    // Le serveur a renvoyé un code d'erreur
                    this.$state.errorAuthentification = error.response.data.message;
                } else if (error.request) {
                    // La requête a été faite mais aucune réponse n'a été reçue
                    this.$state.errorAuthentification = 'Erreur sur l\'authentification';
                } else {
                    // Quelque chose s'est mal passé lors de la configuration de la requête
                    this.$state.errorAuthentification = error.message;
                }
                  this.$state.isLoggedUser = false;
              }); 
        },

        logout() {
            this.$state.token = null;
            localStorage.removeItem('token');
            this.$state.isLoggedUser = false;
            router.push('/connexion');
        }
    }
});

 
