<script setup lang="ts">
defineProps<{
  customClass?: string
  backgroundColor?: string
  borderColor?: string
}>()
</script>

<template>
  <div 
    :class="['BaseCard', customClass]"
    :style="{
      '--base-card-bg': backgroundColor,
      '--base-card-border': borderColor
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.BaseCard {
  background-color: var(--base-card-bg, var(--card-background));
  border: 2px solid var(--base-card-border, rgba(255, 255, 255, 0));
  border-radius: 12px;
  padding: 16px;

  box-shadow: var(--card-shadow);

  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
