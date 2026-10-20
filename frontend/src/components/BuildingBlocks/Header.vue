<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import BaseCard from './../BaseComponents/BaseCard.vue';
import PetitionMaker from '../../Utilities/PetitionMaker';
import ServerRoutes from '../../../keys';

const petitionMaker: PetitionMaker = new PetitionMaker();
const serverRoutes: ServerRoutes = new ServerRoutes();

const props = defineProps<{
    isAdmin: boolean,
    isAuth: boolean,
    showHamburgerMenu: boolean;
    enableHamburguerMenu: () => void,
}>()

const isAdmin = ref(false);
const extendMenu = ref<boolean>(true);

const redirect = (url: string) => {
    location.href = url;
}

const goHome = () => {
    redirect("/");
}

const handleResize = () => {
    if (isAdmin.value) {
        extendMenu.value = window.innerWidth > 1265;
    }
    else {
        extendMenu.value = window.innerWidth > 630;
    }
};

onMounted(async () => {
    handleResize();

    const admin = await petitionMaker.makePetition('/api/auth/amIAdmin', 'GET');
    isAdmin.value = (admin.status == 200);
    
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
</script>

<template>
    <div :class="['TopBarParent', isAuth ? '' : 'centeredTopBar']">
        <div class="TopBarDiv">
            <div class="PageLogoDiv" v-on:click="goHome">
                <img src="./../../assets/Logo.svg" alt="MejoraDA Logo" class="ServiceLogo"/>
                <h1 class="pageText"> MejoraDA </h1>
            </div>
        </div>

        <div class="TopBarDiv" v-if="props.isAuth" style="padding-left: 20px;">
            <div class="AdminOptions" style="margin-right: 0px;">
                <div class="extendedMenu" v-if="extendMenu">
                    <div>
                        <p class="pageText" v-on:click="redirect(serverRoutes.base_url + '/admin/review')"> Revisión de formularios </p>
                    </div>
                    <div v-if="isAdmin">
                        <p class="pageText" v-on:click="redirect(serverRoutes.base_url + '/admin/departments')"> Administración de subdelegaciones </p>
                    </div>
                    <div v-if="isAdmin">
                        <p class="pageText" v-on:click="redirect(serverRoutes.base_url + '/admin/users')"> Administración de usuarios </p>
                    </div>
                    <div>
                        <p class="pageText" v-on:click="redirect(serverRoutes.base_url + '/admin/logout')"> Cerrar sesión </p>
                    </div>
                </div>
                
                <div class="hamburgerMenu" v-else>
                    <p class="hamburgetMenu_Button" style="margin-right: 0px;" v-on:click="enableHamburguerMenu"> ☰ </p>
                    
                    <Teleport to="body">
                        <Transition name="slide-top">
                            <BaseCard custom-class="hamburguerMenu_Content" top bottom v-if="showHamburgerMenu">
                                <p class="hamburgerMenu_Option" v-on:click="redirect(serverRoutes.base_url + '/admin/review')"> Revisión de formularios </p>
                                <p class="hamburgerMenu_Option" v-on:click="redirect(serverRoutes.base_url + '/admin/departments')" v-if="isAdmin"> Administración de subdelegaciones </p>
                                <p class="hamburgerMenu_Option" v-on:click="redirect(serverRoutes.base_url + '/admin/users')" v-if="isAdmin"> Administración de usuarios </p>
                                <p class="hamburgerMenu_Option logoutText" v-on:click="redirect(serverRoutes.base_url + '/admin/logout')"> Cerrar sesión </p>
                            </BaseCard>
                        </Transition>
                    </Teleport>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.TopBarParent {
    position: absolute;

    padding-top: 10px;
    width: 100dvw;
    height: 10dvh;

    display: flex;
    flex-direction: row;

    justify-content: space-between;
}

.centeredTopBar {
    justify-content: center;
}

.TopBarDiv {
    isolation: isolate;
    backdrop-filter: blur(2px);
    background: var(--primary-glass);
    background-image:
        radial-gradient(120% 80% at 15% -10%, rgba(255,255,255,.55), transparent 55%),
        radial-gradient(90% 70% at 95% 110%, rgba(0,200,255,.14), transparent 60%);

    order: 1px solid var(--glass-border);
    
    box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.921),
        0 2px 6px rgba(0, 0, 0, 0.284);

    width: auto;
    height: 8dvh;

    top: 2dvh;
    padding-left: 10px;
    padding-right: 20px;

    margin-right: 2.5%;
    margin-left: 2.5%;
    
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    border-radius: 50px;

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
    align-items: center;
}

.hamburgerMenu {
    display: flex;
    flex: 1;

    flex-direction:row-reverse;
}

.hamburgetMenu_Button {
    font-size: 35px;
    font-weight: 800;
    color: white;
    margin-right: 0px;
    
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

.hamburgerMenu_Option {
    background-color: rgba(255, 255, 255, 0);
    margin: 0px;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
    font-weight: 800;
}

.hamburgerMenu_Option:hover {
    background-color: var(--accent-warm);
}

.logoutText {
    color: var(--danger);
}
</style>
