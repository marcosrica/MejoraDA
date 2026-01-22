<script setup lang="ts">
import { ref } from 'vue';
import BaseMenu from '../BaseComponents/BaseMenu.vue';
import Header from './Header.vue';

const isMenuOpen = ref(true);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="Home_background">
    <Header @toggle-menu="toggleMenu" />

    <div class="Home_content_wrapper">
      <BaseMenu :isOpen="isMenuOpen" 
      @close="isMenuOpen = false"/>
      <div class="Home_content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
    .Home_background {
        height: 100dvh;
        width: 100dvw;

        display: flex;
        flex-direction: column;

        background-color: var(--background);
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
            width: 80%;
        }
        @media (orientation: portrait) {
          width: 95%;
        }
    }
</style>