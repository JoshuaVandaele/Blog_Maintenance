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
  
<style lang="scss">
  @import './form-article.component.scss';
</style>
  