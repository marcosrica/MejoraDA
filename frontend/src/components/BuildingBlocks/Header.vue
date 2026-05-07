<script lang="ts" setup>
import { ref } from 'vue';

const extendMenu = ref<boolean>(true);

const goHome = () => {
  location.href = "/";
}
</script>

<template>
    <div class="TopBarDiv">
        <div class="PageLogoDiv" v-on:click="goHome">
            <img src="./../../assets/Logo.svg" alt="MejoraDA Logo" class="ServiceLogo"/>
            <h1 class="pageText"> MejoraDA </h1>
        </div>

        <div class="AdminOptions">
            <div class="extendedMenu" v-if="extendMenu">
                <div>
                    <p class="pageText"> Revisión de formularios </p>
                </div>
                <div>
                    <p class="pageText"> Administración de subdelegaciones </p>
                </div>
                <div>
                    <p class="pageText"> Cerrar sesión </p>
                </div>
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
    justify-content: flex-start;

    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
}

.PageLogoDiv {
    display: flex;
    flex-direction: row;
    align-items: center;

    height: 100%;
    cursor: pointer;
}

.AdminOptions {
    flex:1;

    display: flex;
    flex-direction: row;
}

.extendedMenu {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    gap: 20px;

    margin-right: 10px;
}

.pageText {
    margin: 0px;
    color: white;
}

.ServiceLogo {
    height: 100%;
    margin-right: 15px;
    margin-left: 20px;
    align-items: center;
}
</style>
