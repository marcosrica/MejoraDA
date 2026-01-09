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
  background-color: var(--base-card-bg, var(--panel-background));
  border: 2px solid var(--base-card-border, rgba(255, 255, 255, 0));
  border-radius: 12px;
  padding: 16px;

  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.9),
    0 2px 6px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
