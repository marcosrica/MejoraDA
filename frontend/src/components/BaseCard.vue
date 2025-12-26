<script setup lang="ts">
defineProps<{
  customClass?: string
}>()
</script>

<template>
  <div :class="['BaseCard', customClass]">
    <slot />
  </div>
</template>

<style scoped>
.BaseCard {
  width: 100%;
  background-color: var(--panel-background);
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
