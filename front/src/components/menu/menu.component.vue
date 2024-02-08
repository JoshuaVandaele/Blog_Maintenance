<template>
    <div class="sc-menu__container">
        <img src="@/assets/logo.png" class="sc-menu__logo"/>
        <div class="sc-menu__links">
            <router-link to="/">Acceuil</router-link>
            <span>|</span>
            <router-link to="/my-articles">Mes&nbsp;articles</router-link>
            <span>|</span>
            <router-link to="/create-article">Créer</router-link>
            <Avatar/>
        <!--    <v-avatar
              color="brown"
              size="large"
            >
              <span class="text-h8">LLF</span>
            </v-avatar>-->
        </div>
    </div>
  </template>
  
  <script lang="ts" setup>
    import Avatar from '@/components/menu/avatar/avatar.component.vue';
  </script>
  
  <style lang="scss">
    @import './menu.component.scss';
  </style>
  