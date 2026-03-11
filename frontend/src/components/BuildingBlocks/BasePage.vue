<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import BaseMenu from '../BaseComponents/BaseMenu.vue';
  import Header from './Header.vue';
  import PetitionMaker from '../../Utilities/PetitionMaker';
import BaseNotAuth from '../BaseComponents/BaseNotAuth.vue';
import LoginMenuFloating from '../BaseComponents/LoginMenuFloating.vue';

  const props = defineProps<{
    showContent: boolean
  }>()

  const petitionMaker:PetitionMaker = new PetitionMaker();

  //Tracks wether the user is privileged, to know if it should show the menu
  const privilegedUser = ref(true);
  //Tracks wether the user is adming, to surface the users panel option in the menu
  const adminUser = ref(true);
  //Tracks wether the user is logged in
  const loggedIn = ref(false);

  onMounted(async () => {
    //Checks wether the currently logged user is privileged
    const result = await petitionMaker.makePetition('/api/auth/amIPrivileged', 'GET');
    privilegedUser.value = result.status == 200;

    if(privilegedUser.value) {
      //If the user is privileged, checks wether it is admin or not
      const isAdmin = await petitionMaker.makePetition('/api/auth/amIAdmin', 'GET');
      adminUser.value = isAdmin.status == 200;
    }

    //DEBUG. TODO: Remove for production
    privilegedUser.value = false;
    adminUser.value = false;
  });
</script>

<template>
  <div class="Home_background">
    <Header />

    <div class="Home_content_wrapper">
      <!-- Content area -->
      <div class="Home_content">
        <slot v-if="showContent" />
        <BaseNotAuth v-else />
      </div>

      <!-- Toggle menu that sits on top of the content -->
      <BaseMenu :visible="loggedIn" :privileged="privilegedUser" :admin="adminUser"/>

      <LoginMenuFloating :visible="!loggedIn"></LoginMenuFloating>
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
</style>