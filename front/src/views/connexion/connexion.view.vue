<template>
    <FormConnexion class="sc-connexion__center"  />
</template>

<script lang="ts" setup>
import FormConnexion from '@/components/form-connexion/form-connexion.component.vue';
</script>

<style scoped>
    .sc-connexion__center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>