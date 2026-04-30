<script lang="ts" setup>
const goHome = () => {
  location.href = "/";
}
</script>

<template>
    <div class="TopBarDiv" v-on:click="goHome">
      <img src="./../../assets/Logo.png" alt="MejoraDA Logo" class="ServiceLogo"/>
      <h1 class="pageText"> MejoraDA </h1>
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
  justify-content: flex-start;

  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;

  cursor: pointer;
}

.pageText {
  margin: 0px;
  color: white;
}

.ServiceLogo {
  height: 60%;
  margin-right: 15px;
  margin-left: 20px;
}
</style>