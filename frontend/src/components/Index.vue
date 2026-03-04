<script setup lang="ts">
  import BaseCard from './BaseComponents/BaseCard.vue'
  import BaseButton from './BaseComponents/BaseButton.vue'
  import BasePage from './BuildingBlocks/BasePage.vue';
  import { inject } from 'vue';
  import type Keycloak from 'keycloak-js';

  const keycloak = inject<Keycloak>('keycloak');

  const fillFormButtonClicked = () => {
    location.href = '/Form';
  }

  const loginButtonClicked = () => {
    if (!keycloak) return;

    // Check if we are already authenticated
    if (!keycloak.authenticated) {
      keycloak.login({
        // Optional: where to go after login (usually your current origin)
        redirectUri: window.location.origin,
      });
    } else {
      console.log("User is already logged in!");
      // You could redirect them to /Form here if you want
    }

    if(keycloak.authenticated) {
      console.log("User ID:", keycloak.subject); // The unique UUID for the user
      console.log("Display Name:", keycloak.idTokenParsed?.preferred_username);
      console.log("Full Token Data:", keycloak.tokenParsed);
      console.log("User Roles:", keycloak.realmAccess?.roles);
    }
  }
</script>

<template>
  <BasePage show-content>
    <!-- Intro -->
    <BaseCard custom-class="BaseContainer" top>
        <p class="HeaderText"><b>MejoraDA, un medio para la superación de todos</b></p>
        <p class="DescriptionText">
          Desde la delegación de alumnos, siempre estamos atentos a todo lo que ocurra en nuestra escuela, y estamos buscando constantemente formas de mejorar la ETSISI para todos. 
        </p>
        <p class="DescriptionText">
          Por ello, os hemos habilitado mejoraDA, una plataforma completamente anónima en la que nos podeis contar vuestra visión de la escuela, todo aquello que os gustaría que ocurriese, y las cosas que desearíais que cambiasen. 
        </p>
    </BaseCard>

    <!-- Create a form -->
    <BaseCard custom-class="BaseContainer">
      <BaseButton  
       @click="loginButtonClicked"
       variant="primary"
       custom-class="FillFormButton">
        Iniciar sesión  
      </BaseButton>
    </BaseCard>

    <!-- Create a form -->
    <BaseCard custom-class="BaseContainer" bottom>
      <p class="HelpHeader"><b>¿Tienes algo que contarnos?</b></p>
      <p class="DescriptionText">No dudes en rellenar una nueva solicitud, <b>¡es totalmente anónima!</b> </p>
      <p class="DescriptionText">Tardarás <b>menos de cinco minutos</b> en hacerla, y nos será muy útil para <b>mejorar la experiencia de todos</b> en la escuela.</p>
      <BaseButton  
       @click="fillFormButtonClicked"
       variant="primary"
       custom-class="FillFormButton">
        Rellenar el formulario
      </BaseButton>
    </BaseCard>
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

  .HeaderText {
    font-family: 'Montserrat', sans-serif;
    font-size: x-large;
    text-align: center;
    margin-bottom: 10px;
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
    text-align: justify;
    max-width: 90%;

    margin-top: 5px;
    margin-bottom: 7px;
  }
</style>
