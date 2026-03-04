<script setup lang="ts">
  import { inject, onMounted, ref } from 'vue';
  import type Keycloak from 'keycloak-js';
import BaseButton from '../BaseComponents/BaseButton.vue';

  const keycloak = inject<Keycloak>('keycloak');
  
  const loggedIn = ref<boolean>(false);

  const login = async () => {
    if(!keycloak) { return; }

    keycloak.login({
        // Optional: where to go after login (usually your current origin)
        redirectUri: window.location.origin,
      });
  }

  onMounted( () => {
    if(keycloak) {
      loggedIn.value = keycloak.authenticated;
    }
  });
</script>

<template>
    <div :class="['TopBarDiv', loggedIn ? 'TopBarDiv_logged' : '']">
      <div :class="['PageID', loggedIn ? 'PageID_logged' : '']" onclick="location.href = '/'">
        <img src="./../../assets/Logo.png" alt="MejoraDA Logo" class="ServiceLogo"/>
        <h1 class="pageTitle"> MejoraDA </h1>
      </div>

      <div class="UserDiv" v-if="loggedIn">
        <p :class="['userText', loggedIn ? 'userText_logged' : '']"> {{ keycloak?.idTokenParsed?.preferred_username }}</p>
        <p :class="['userText', loggedIn ? 'userText_logged' : '']"> &#8964 </p>
      </div>
      
      <div class="UserDiv" v-if="!loggedIn">
        <BaseButton variant="secondary"
        v-on:click="login"
        custom-class="loginButton">
          Iniciar sesión
        </BaseButton>
      </div>
    </div>
</template>

<style scoped>
.TopBarDiv {
  background-color: var(--primary);
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.921),
    0 2px 6px rgba(0, 0, 0, 0.284);

  width: 100dvw;
  height: 10dvh;

  position: fixed;
  top: 0;

  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}

.TopBarDiv_logged {
  @media(orientation: portrait) {
    flex-direction: column;
  }
}

.PageID {
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: white;

  height: 100%;

  margin-left: 20px;
  cursor:pointer;
}

.PageID_logged {
  height: 70%;
  margin-left: 0px;
}


.UserDiv {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 15px;

  @media(orientation: portrait) {
    height: 40%;
    margin-right: 0px;
  }
}

.ServiceLogo {
  height: 60%;
  margin-right: 10px;
}

.userText {
  color: white;
  text-align: center;
  font-weight: 700;
  font-size: 40px;
  margin: 0px;
}

.userText_logged {
  @media(orientation: portrait) {
    font-size: 20px;
    margin-right: 0px;
  }
}

.pageTitle {
  margin: 0px;
} 

.loginButton {
  @media(orientation: portrait) {
    font-size: 11px;
    margin-right: 5px;
  }
}
</style>