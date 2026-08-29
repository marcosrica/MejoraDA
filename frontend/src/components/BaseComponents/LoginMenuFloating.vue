<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from './BaseButton.vue';

const open = ref(false);

const props = defineProps<{
  visible?: boolean
}>();
</script>

<template>
  <BaseButton v-if="props.visible" class="ToggleButton" @click="open = !open">🔒 Iniciar sesión</BaseButton>
</template>

<style scoped>
.ToggleButton { 
  position: fixed; 
  bottom: 15px; 
  left: 15px; 
  z-index: 1000;
  border-radius: 10px; 
  font-size: 1.5rem; 
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  align-items: center; 
  justify-content: center;
}
</style>