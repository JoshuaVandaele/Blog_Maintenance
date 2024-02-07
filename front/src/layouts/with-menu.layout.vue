<template>
  <v-app>
    <Menu/>
    <Alert/>
    <v-main class="sc-main__container">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import Menu from '@/components/menu/menu.component.vue';
  import Alert from '@/components/alert/alert.component.vue';
</script>

<style scoped>
  .sc-main__container {
    padding: 24px
  }
</style>