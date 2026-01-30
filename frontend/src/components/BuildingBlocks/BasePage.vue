<script setup lang="ts">
  import { ref } from 'vue';
  import BaseMenu from '../BaseComponents/BaseMenu.vue';
  import Header from './Header.vue';

  const privilegedUser = ref(true); // This should be set based on actual user privileges
</script>

<template>
  <div class="Home_background">
    <Header />

    <div class="Home_content_wrapper">
      <!-- Content area -->
      <div class="Home_content">
        <slot />
      </div>

      <!-- Toggle menu that sits on top of the content -->
      <BaseMenu :visible="privilegedUser"/>
    </div>
  </div>
</template>

<style scoped>
  .Home_background {
    height: 100dvh;
    width: 100dvw;

    display: flex;
    flex-direction: column;

    background-color: var(--page-background);
  }

  .Home_content_wrapper {
    box-sizing: border-box;
    width: 100%;
    height: auto;
    margin-top: 10dvh;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    overflow-y: auto;
  }

  .Home_content {
    /* Width and height */
    box-sizing: border-box;

    height: auto;
    box-sizing: border-box;

    /* Margins */
    padding-top: 20px;
    padding-bottom: 50px;
    padding-left: 5px;
    padding-right: 5px;

    @media (orientation: landscape) {
      @media (max-width: 1000px) {
        width: 90%;
      }
      @media (max-width: 1450px) {
        width: 80%;
      }
      @media (min-width: 1451px) {
        width: 60%;
      }
    }
    @media (orientation: portrait) {
      width: 95%;
    }
  }
</style>