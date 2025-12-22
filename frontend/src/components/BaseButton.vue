<script setup lang="ts">
import { computed } from 'vue' 

const props = defineProps<{
  type?: 'button' | 'submit' | 'reset'
  customClass?: string         // for per-instance styling
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'danger' // button style
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const buttonClass = computed(() => [
  'BaseButton__btn',
  `BaseButton--${props.variant ?? 'primary'}`,
  props.customClass
])
</script>

<template>
  <button
    :type="props.type || 'button'"
    :disabled="props.disabled"
    :class="buttonClass"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
.BaseButton__btn {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;
  text-align: center;
}

/* Variants */
.BaseButton--primary {
  background-color: var(--main-color);
  color: white;
}

.BaseButton--primary:hover:not(:disabled) {
  background-color: #0056b3;
}

.BaseButton--secondary {
  background-color: #f0f0f0;
  color: #333;
}

.BaseButton--secondary:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.BaseButton--danger {
  background-color: #a61b1b;
  color: white;
}

.BaseButton--danger:hover:not(:disabled) {
  background-color: #7f1414;
}

.BaseButton__btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
