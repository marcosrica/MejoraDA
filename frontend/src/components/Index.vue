<script setup lang="ts">
  import { ref } from 'vue';
  import BaseAlert from './BaseComponents/BaseAlert.vue';
  import BaseCard from './BaseComponents/BaseCard.vue';
  import BasePage from './BuildingBlocks/BasePage.vue';
  import Form from './Form.vue';
  
  const showAlert = ref(false);
  const alertMessage = ref('');
  const alertType = ref<'success' | 'error' | 'info'>('success');

  const triggerAlert = (type: 'success' | 'error' | 'info', message:string) => {
    alertType.value = type;
    alertMessage.value = message;
    showAlert.value = true;
  }
</script>

<template>
  <BasePage show-content>
    <BaseAlert
        :show="showAlert"
        :type="alertType"
        :message="alertMessage"

        @close="showAlert = false"
    />

    <!-- Intro -->
    <BaseCard top>
      <h1 class="Marginless"> MejoraDA, un medio para la superación de todos </h1>
    </BaseCard>    
    <BaseCard custom-class="BaseContainer" bottom>
      <p class="DescriptionText"> 
        Desde la Delegación de Alumnos, siempre estamos atentos a todo lo que ocurra en nuestra escuela, y no paramos de buscar formas de mejorar la experiencia para todos.
        <br>
        Por ello, hemos habilitado MejoraDA, una plataforma completamente anónima en la que nos podéis contar vuestra visión de la escuela, todo lo que querríais que ocurriese y lo que os gustaría que cambiase.
      </p>
    </BaseCard>

    <Form class="FormWrapper" :throwError="triggerAlert"></Form>
  </BasePage>
</template>

<style scoped>
  .BaseContainer {
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-bottom: 10px;
    box-sizing: border-box;
    width: 100%;
  }

  .FormWrapper {
    margin-top: 50px;
  }

  .Marginless {
    margin: 0px;
    text-align: center;
  }

  .DescriptionText {
    font-family: 'Montserrat', sans-serif;
    font-size: large;
    font-weight: 500;
    text-align: justify;
    max-width: 90%;

    margin-top: 5px;
    margin-bottom: 7px;
  }
</style>
