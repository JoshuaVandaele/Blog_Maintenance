<template>
    <div class="sc-form-article__container">
        <v-form @submit.prevent="updateOrCreate" class="sc-form-article__form">
            <h1>{{modeDisplay === 'CREATE' ? 'Création' : 'Modification'}}</h1>    

            <v-row>
                <v-text-field v-model="title" label="Titre" />
            </v-row>
            
            <v-row>
                <v-textarea
                    clearable
                    clear-icon="mdi-close-circle"
                    label="Content"
                    v-model="content"
                ></v-textarea>
            </v-row>

            <v-row>
                <v-btn
                block
                type="submit"
                color="primary"
                class="button"
                >
                {{ modeDisplay === 'CREATE' ? 'Créer' : 'Modifier' }}
                </v-btn>
            </v-row>
        </v-form>
    </div>
  </template>
  
  <script lang="ts" setup>
    import { ref, defineProps } from 'vue';
    import { ModeDisplayArticle } from '../../types/ModeDisplayArticle.type';
    import { Alert, factoryAlertSuccess } from '@/models/alert.model';
    import { useAppStore } from '@/store/app';
    import { useRouter } from 'vue-router';
    import Axios from "@/core/api";

    const store = useAppStore();
    const router = useRouter();

    const props = defineProps<{
        modeDisplay: ModeDisplayArticle;
        article?: Article;
    }>();


    const title = ref(props.article ? props.article.title : null);
    const content = ref(props.article ? props.article.content: null);

    const updateOrCreate = () => {
      if (props.modeDisplay === 'CREATE') {
        createArticle();
      } else {
        updateArticle();
      }
    };

    const createArticle = async () => {
      try {
        const response = await Axios.post('/articles', {
            title: title.value,
            content: content.value,
        });
        
        const alert: Alert = factoryAlertSuccess('Création article', 'Article créé avec succès !');
        store.updateAlert(alert);
        router.push('/my-articles');
      } catch (error) {
        console.error(error);
      }
    };  

    const updateArticle = async () => {
        try {
                const response = await Axios.put(`/articles/${props.article.id}`, {
                title: title.value,
                content: content.value,
            });
            
            const alert: Alert = factoryAlertSuccess('Modification article', 'Article modifié avec succès !');
            store.updateAlert(alert);
            router.push('/my-articles');

            console.log(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };  

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    h1 {
        margin-bottom: 32px;
    }

    .sc-form-article__form {
        width: 700px;
        padding: 32px;
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    }


    .sc-form-article__container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }

  </style>
  