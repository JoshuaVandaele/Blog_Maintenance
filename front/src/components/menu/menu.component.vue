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
  
  <style scoped>
    .sc-menu__container {
        display: flex;
        justify-content: space-between;
        padding: 16px 24px;
        background-color: #1867C0;
    }

    .sc-menu__logo {
        height: 45px;
    }

    .sc-menu__links {
        display: flex;
        align-items: center;
        gap: 24px;

        a, span {
            color: white;
        }
    }

  </style>
  