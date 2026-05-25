<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import BaseCard from './../BaseComponents/BaseCard.vue';

const props = defineProps<{
    isAdmin: boolean,
    showHamburgerMenu: boolean;
    enableHamburguerMenu: () => void,
}>()

const extendMenu = ref<boolean>(true);

const redirect = (url: string) => {
    location.href = url;
}

const goHome = () => {
    redirect("/")
}

const showHideHamburguerMenu = () => {
    props.enableHamburguerMenu();
}

const handleResize = () => {
  extendMenu.value = window.innerWidth > 950;
};

onMounted(() => {
    handleResize();
    
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
    <div class="TopBarDiv">
        <div class="PageLogoDiv" v-on:click="goHome">
            <img src="./../../assets/Logo.svg" alt="MejoraDA Logo" class="ServiceLogo"/>
            <h1 class="pageText"> MejoraDA </h1>
        </div>

        <div class="AdminOptions" v-if="isAdmin">
            <div class="extendedMenu" v-if="extendMenu">
                <div>
                    <p class="pageText" v-on:click="redirect('/admin/review')"> Revisión de formularios </p>
                </div>
                <div>
                    <p class="pageText" v-on:click="redirect('/admin/departments')"> Administración de subdelegaciones </p>
                </div>
                <div>
                    <p class="pageText" v-on:click="redirect('/admin/logout')"> Cerrar sesión </p>
                </div>
            </div>

            <div class="hamburgerMenu" v-else>
                <p class="hamburgetMenu_Button" v-on:click="enableHamburguerMenu"> ☰ </p>

                <Teleport to="body">
                    <Transition name="slide-top">
                        <BaseCard custom-class="hamburguerMenu_Content" top bottom v-if="showHamburgerMenu">
                            <p> Revisión de formularios </p>
                            <p> Administración de subdelegaciones </p>
                            <p> Cerrar sesión </p>
                        </BaseCard>
                    </Transition>
                </Teleport>
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

    z-index: 100;
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

    cursor: pointer;
}

.ServiceLogo {
    height: 100%;
    margin-right: 15px;
    margin-left: 20px;
    align-items: center;
}

.hamburgerMenu {
    display: flex;
    flex: 1;

    flex-direction:row-reverse;
    margin-right: 25px;
}

.hamburgetMenu_Button {
    font-size: 35px;
    font-weight: 800;

    cursor: pointer;
}

.hamburguerMenu_Content {
    position: fixed;
    z-index: 50;

    top: 9%;
    right: 10px
}

.slide-top-enter-active,
.slide-top-leave-active {
    transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease;
}

.slide-top-enter-from,
.slide-top-leave-to {
    transform: translateY(-100%); 
    opacity: 0; 
}

.slide-top-enter-to,
.slide-top-leave-from {
    transform: translateY(0);
    opacity: 1;
}
</style>
