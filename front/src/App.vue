
<template>
  <component :is="layoutComponent">
    <router-view />
  </component>
</template>

<script lang="ts" setup>
import { ref, watch, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const layoutComponent = ref("DefaultLayout")

watch(route, (to) => {
  const layout = to.meta.hasMenu ? 'with-menu' : 'default'
  layoutComponent.value = defineAsyncComponent(() => import(`@/layouts/${layout}.layout.vue`))
}, { immediate: true })
</script>