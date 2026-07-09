<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Header from './Header.vue';
  import PetitionMaker from '../../Utilities/PetitionMaker';
  import BaseNotAuth from '../BaseComponents/BaseNotAuth.vue';

  const props = defineProps<{
    showContent: boolean
  }>()

  const petitionMaker:PetitionMaker = new PetitionMaker();

  //Tracks wether the user is privileged, to know if it should show the menu
  const allowedUser = ref(false); 
  const showHamburgerMenu = ref(false);

  const showHideHamburgerMenu = ():void => {
    showHamburgerMenu.value = !showHamburgerMenu.value;
  }

  const getPrivileged = async () => {
    const response = await petitionMaker.makeGetPetition("/api/auth/amIPrivileged");

    allowedUser.value = response.status == 200;
  };

  onMounted(async () => {
    await getPrivileged();
    console.log(allowedUser);
  });
</script>

<template>
  <div class="Home_background">
    <Header :isAdmin="allowedUser" :showHamburgerMenu="showHamburgerMenu" :enableHamburguerMenu="showHideHamburgerMenu"/>

    <div class="Home_content_wrapper">
      <div class="HamburgerMenuBlackout" v-if="showHamburgerMenu" v-on:click="showHideHamburgerMenu" />

      <!-- Content area -->
      <div class="Home_content">
        <slot v-if="showContent" />
        <BaseNotAuth v-else />
      </div>

      <!-- Toggle menu that sits on top of the content -->
      
      <!--
      <BaseMenu :visible="allowedUser" :privileged="allowedUser" :admin="true"/>
      
      
      <LoginMenuFloating :visible="!loggedIn"></LoginMenuFloating>
      -->
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
    margin-top: 10dvh;
    box-sizing: border-box;
    height: calc(100dvh - 10dvh);

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

    /* Margins */
    padding-top: 20px;
    padding-left: 5px;
    padding-right: 5px;
    padding-bottom: 80px;

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

  .HamburgerMenuBlackout {
    width: 100%;
    height: 100%;

    position: fixed;
    bottom: 0px;

    background-color: rgba(0, 0, 0, 0.663);

    z-index: 10;
  }
</style>