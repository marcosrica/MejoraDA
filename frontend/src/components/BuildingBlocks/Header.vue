<script lang="ts" setup>
import { ref } from 'vue';

const loggedIn = ref<boolean>(false)
</script>

<template>
    <div class="TopBarDiv">
      <img src="./../../assets/Logo.png" alt="MejoraDA Logo" class="ServiceLogo"/>
      <div :class="['PageID',  {loggedIn: 'LoggedIn'}]" onclick="location.href = '/'">
        <h1 class="pageText"> MejoraDA </h1>
        <div class="userPanel">
          <p v-if="loggedIn" class="userText">Test user</p>
        </div>
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

.pageText {
  margin: 0px
}

.PageID {
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: white;

  height: 100%;

  margin-left: 20px;
  cursor:pointer;
  flex: 1;

  @media(orientation: portrait) {
    flex-direction: column;
    justify-content: center;
  }
}

.LoggedIn {
  justify-content: space-around;
}

.ServiceLogo {
  height: 60%;
  margin-right: 15px;
  margin-left: 20px;
}

.userPanel {
  margin-right: 15px;
}

.userText {
  font-size: 20px;
  font-weight: bolder;
  margin: 0px;
}
</style>