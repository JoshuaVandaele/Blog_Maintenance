<template>
    <v-container
      fluid
    >
      <v-row justify="center">
        <v-menu
          min-width="200px"
          rounded
        >
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              v-bind="props"
            >
              <v-avatar
                color="orange"
                size="large"
              >
                <span class="text-h8">{{ user?.name.substring(0,1).toUpperCase() }}</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <div class="mx-auto text-center">
                <v-avatar
                  color="orange"
                >
                  <span class="text-h8">{{ user?.name.substring(0,1).toUpperCase() }}</span>
                </v-avatar>
                <h3 class="sc-avatar__name">{{ user?.name }}</h3>
                <p class="text-caption mt-1">
                  {{ user?.email }}
                </p>
                <v-divider class="my-3"></v-divider>
                <v-btn
                  rounded
                  variant="text"
                  @click="storeUser.logout"
                >
                  Déconnection
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
    import { computed } from 'vue';
    import { useUserStore } from '@/store/user';

    const storeUser = useUserStore();
    const user = computed(() => storeUser.getUser);
  </script>

<style scoped>
.sc-avatar__name {
  margin: 8px 0;
}

</style>
```