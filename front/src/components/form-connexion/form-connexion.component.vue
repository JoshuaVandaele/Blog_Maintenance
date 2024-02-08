<template>
    <div class="connexion-container">
        <v-form v-if="!showForgotPasswordForm" class="connexion-form" @submit.prevent="connexion">
            <v-row v-if="errorAuthentication" class="error">
                <v-alert outlined type="error">
                    {{ errorAuthentication }}
                </v-alert>
            </v-row>

            <h1>connectez-vous</h1>
            
            <v-row>
                <v-text-field v-model="mail" clearable label="mail"/>
            </v-row>

            <v-row>
                <v-text-field v-model="password" label="mot de passe" clearable
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPassword ? 'text' : 'password'"
                @click:append-inner="showPassword = !visible"
                />
            </v-row>

            <v-row>
                <v-btn
                block
                type="submit"
                color="primary"
                class="button"
                >
                Se connecter
                </v-btn>
            </v-row>

            
            <v-row class="actions-link">
                <v-col>
                    <a href="#" @click.prevent="showForgotPasswordForm = true">
                        Mot de passe oublié
                    </a>

                    <router-link to="/registration" class="link-create-account">
                        Création de compte
                    </router-link>
                </v-col>
            </v-row>
        </v-form>

        <v-form v-else class="connexion-form" @submit.prevent="forgotPassword">
            <v-row v-if="message" class="sc-form-connexion__message">
                <v-alert outlined :type="typeMessage">
                    {{ message }}
                </v-alert>
            </v-row>

            <h1>Mot de passe oublié</h1>

            <v-row>
                <v-text-field v-model="mail" clearable label="mail"/>
            </v-row>

            <v-row>
                <v-btn
                block
                type="submit"
                color="primary"
                class="button"
                >
                Réinitialisation mot de passe
                </v-btn>
            </v-row>
        </v-form>
    </div>
</template>

<script setup>
    import { useUserStore } from '@/store/user';
    import { useRouter } from 'vue-router';
    import { ref, computed } from "vue";
    import Axios from "@/core/api";

    const mail = ref(null);
    const password = ref(null);
    const showPassword = ref(false);
    const showForgotPasswordForm = ref(false);
    const message = ref(null);
    let typeMessage = null;

    const storeUser = useUserStore();
    const router = useRouter();

    const errorAuthentication = computed(() => storeUser.getErrorAuthentification);

    const forgotPassword = async() =>{
       Axios.post('/connexion/forgot-password', { email: mail.value }).then(response => {
            typeMessage = 'success';
            message.value = response.data;
        }).catch(error => {
            console.log(error);
            if (error?.response?.data) {
                typeMessage = 'error';
                message.value = error?.response?.data;
            }
            else {
                 typeMessage = 'error';
                message.value = error.message;
            }
        });
    }  

    const connexion = async() => {
        await storeUser.connexion(mail.value, password.value);
    }
</script>

<style lang="scss">
    @import './form-connexion.component.scss';
</style>