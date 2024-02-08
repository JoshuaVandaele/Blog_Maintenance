<template>
    <div class="sc-form-registration__container">
    <form @submit.prevent="createAccount" class="sc-form-registration__form">

      <v-row v-if="message" class="sc-form-registration__message">
                <v-alert outlined :type="typeMessage">
                    {{ message }}
                </v-alert>
      </v-row>

      <h1>Crée un compte</h1>

      <v-text-field 
        v-model="name.value.value"
        :counter="10"
        :error-messages="name.errorMessage.value"
        clearable
        placeholder="BoO"
        label="Nom utilisateur"
      ></v-text-field>
  
      <v-text-field
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        clearable
        placeholder="johndoe@gmail.com"
        label="E-mail"
      ></v-text-field>
  

      <v-text-field 
        v-model="password.value.value"
        :error-messages="name.errorMessage.value"
        clearable
        label="Mot de passe"
      ></v-text-field>
  
      <div class="sc-form-registration__actions">
        <v-btn type="submit" color="primary"> Crée mon compte </v-btn>
      </div> 
    </form>
</div>
  </template>
  
  <script setup>
    import { ref } from 'vue'
    import { useField, useForm } from 'vee-validate'
    import Axios from "@/core/api";
    import router from "@/router";

    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        name(value) {
          if (value?.length >= 2) return true
  
          return 'Votre nom d\'utilisateur doit contenir au moins 2 caractères'
        },

        email(value) {
          if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
  
          return 'Votre adresse mail n\'est pas valide'
        },
      },
    });

    const name = useField('name')
    const email = useField('email')
    const password = useField('password')
    const message = ref(null);
    let typeMessage = null;
    
    const createAccount = async() => {

      try {
        const createJson = {name: name.value.value, email: email.value.value, password: password.value.value};
        const response = await Axios.post('/users', createJson);
        typeMessage = 'success';
        message.value = response.data;

        setTimeout(() => {
          router.push('/connexion');
        }, 3000);
      } 
      catch (error) {
        typeMessage = 'error';
        if (error.response) {
          message.value = error.response.data;
        }
        else {
          message.value = "Erreur à la création du compte"

        }
      }
  }
  </script>

<style lang="scss">
  @import './form-registration.component.scss';
</style>