<script lang="ts" setup>
</script>

<template>
    <div class="TopBarDiv">
        <div class="PageID" onclick="location.href = '/'">
            <img src="./../../assets/Logo.png" alt="MejoraDA Logo" class="ServiceLogo"/>
            <h1> MejoraDA </h1>
        </div>

        <img src="./../../assets/Logo.png" alt="MejoraDA Logo" class="ServiceLogo"/>
    </div>
</template>

<style scoped>
.TopBarDiv {
  background-color: var(--main-color);
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

.PageID {
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  height: 100%;

  margin-left: 20px;
  cursor:pointer;
}

.ServiceLogo {
  height: 60%;
  margin-right: 15px;
}
</style>