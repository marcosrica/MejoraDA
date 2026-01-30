<script setup lang="ts">
const props = defineProps<{
  customClass?: string,
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <button
    :disabled="props.disabled"
    :class="['BaseRoundedButton', props.customClass]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
.BaseRoundedButton {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 20px;
  padding: 10px 15PX;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  aspect-ratio: 1 / 1;
}

/* Variants */
.BaseRoundedButton {
  background-color: var(--primary-light);
  color: white;
}

.BaseRoundedButton:hover:not(:disabled) {
  background-color: var(--primary-light-hover);
}

.BaseRoundedButton:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
