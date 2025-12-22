<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  placeholder?: string
  name?: string
  id?: string
  disabled?: boolean
  customClass?: string // NEW: class added for this instance
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const inputId = computed(() => props.id || props.name || `input-${Math.random().toString(36).substr(2, 9)}`)

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  if (target) {
    emit('update:modelValue', target.value)
  }
}
</script>

<template>
  <input
    :id="inputId"
    :name="props.name"
    :placeholder="props.placeholder || ''"
    :disabled="props.disabled"
    :class="['BaseTextInput__field', props.customClass]"
    :value="modelValue"
    @input="onInput"
  />
</template>

<style scoped>
.BaseTextInput__field {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.BaseTextInput__field:focus {
  outline: none;
  border-color: var(--main-color);
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.15);
}

.BaseTextInput__field:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}
</style>
