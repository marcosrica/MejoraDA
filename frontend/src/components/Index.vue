<script setup lang="ts">
  import BaseCard from './BaseComponents/BaseCard.vue';
  import BasePage from './BuildingBlocks/BasePage.vue';
  import Form from './Form.vue';
</script>

<template>
  <BasePage show-content>
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

    <Form class="FormWrapper"></Form>
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

  .HeaderText {
    font-family: 'Montserrat', sans-serif;
    font-size: x-large;
    text-align: center;
    margin-bottom: 10px;
  }

  .Marginless {
    margin: 0px;
    text-align: center;
  }

  .FillFormButton {
    min-width: 20%;
  }

  .HelpHeader {
    font-family: 'Montserrat', sans-serif;
    font-size: xx-large;
    text-align: center;
    margin-bottom: 5px;
    margin-top: 0px;
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
