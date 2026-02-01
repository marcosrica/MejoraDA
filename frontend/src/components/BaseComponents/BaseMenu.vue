<script setup lang="ts">
import { ref } from 'vue';
import BaseRoundedButton from './BaseRoundedButton.vue';
import BaseCard from './BaseCard.vue';

const open = ref(false);

const redirect = (url: string) => {
  window.location.href = url;
}

const props = defineProps<{
  visible?: boolean,
  admin?: boolean,
}>();
</script>

<template>
  <BaseRoundedButton v-if="visible" class="ToggleButton" @click="open = !open">☰</BaseRoundedButton>
  
  <div class="TranslucentPanel" v-if="open" @click="open = false">

  </div>

  <transition name="menu-panel">
    <BaseCard 
    custom-class="menu" 
    v-if="open"
    border-color="grey"
    top 
    bottom>
      <div class="MenuHeader">
        <h3 class="MenuHeaderText">Menú</h3>
      </div>
      <div class="MenuOptions">
        <div class="MenuOption" v-on:click="redirect('/')">Página principal</div>
        <div class="MenuOption" v-on:click="redirect('/Home/review')">Revisión de formularios</div>
        <div class="MenuOption" v-on:click="redirect('/Home/users')" v-if="admin">Administración de usuarios</div>
        <div class="MenuOption" v-on:click="redirect('/Home/departments')">Administración de subdelegaciones</div>
      </div>
    </BaseCard>
  </transition>
</template>

<style scoped>
.menu {
  position: fixed;
  bottom: 65px;
  left: 15px;
  width: 280px;
  max-height: 400px;
  padding: 1rem;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  transform-origin: bottom left;
}

/* Transition classes */
.menu-panel-enter-from {
  transform: scaleY(0);
  opacity: 0;
}
.menu-panel-enter-to {
  transform: scaleY(1);
  opacity: 1;
}
.menu-panel-enter-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.menu-panel-leave-from {
  transform: scaleY(1);
  opacity: 1;
}
.menu-panel-leave-to {
  transform: scaleY(0);
  opacity: 0;
}
.menu-panel-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.MenuHeader {
  margin-bottom: 0px;
}

.MenuHeaderText {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.MenuOptions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.MenuOption {
  background-color: transparent;
  transition: 0.3s ease;
  padding: 8px;
  border-radius: 6px;
}

.MenuOption:hover {
  background-color: var(--accent-warm);
  cursor: pointer;
}

.ToggleButton{ 
  position: fixed; 
  bottom: 15px; 
  left: 15px; 
  z-index: 1000; 
  width: 50px; 
  height: 50px; 
  border-radius: 50%; 
  font-size: 1.5rem; 
  box-shadow: 0 4px 12px rgba(0,0,0,0.15); 
  display: flex; 
  align-items: center; 
  justify-content: center; 
}

.TranslucentPanel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 900;
}
</style>