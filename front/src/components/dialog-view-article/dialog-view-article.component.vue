<template>
    <v-dialog transition="dialog-top-transition" width="800"
        v-model="dialogVisible">
          <v-card>
          <v-toolbar color="primary" :title="article.title"></v-toolbar>
          <v-card-text>
            <div class="text-h8 pa-12">{{ article.content }}</div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn variant="text" @click="closeDialog">Fermer</v-btn
            >
          </v-card-actions>
        </v-card>
    </v-dialog>
  </template>
  
  <script setup lang="ts">
    import { ref, watch } from 'vue';
    import { ArticleType } from '@/models/article.model';
    
    const props = defineProps({
        isDisplay : {
            type : Boolean,
            required: true
        },
        article : {
          type: Object as () => ArticleType,
            required: true
        }
    })
  
    const emit = defineEmits<{
        (e:'closeDialog') : void,
    }>();
    
    const dialogVisible = ref(props.isDisplay);
    
    const closeDialog = () => {emit('closeDialog')};
      
  </script>
  
  <style scoped>

  </style>
  