<script setup lang="ts">
import { computed } from 'vue'

type Option = {
  value: string | number
  label: string
}

const props = defineProps<{
  modelValue: string | number
  options: Option[]
  placeholder?: string
  label?: string
  name?: string
  id?: string
  disabled?: boolean
  customClass?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const selectId = computed(() => props.id || props.name || `select-${Math.random().toString(36).substr(2, 9)}`)

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  if (target) {
    emit('update:modelValue', target.value)
  }
}
</script>

<template>
  <div class="BaseSelect">
    <label v-if="label" :for="selectId" class="BaseSelect__label">{{ label }}</label>
    <select
      :id="selectId"
      :name="props.name"
      :disabled="props.disabled"
      :class="['BaseSelect__field', props.customClass]"
      :value="modelValue"
      @change="onChange"
    >
      <option v-if="placeholder" value="" disabled selected hidden>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.BaseSelect {
  display: flex;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
}

.BaseSelect__label {
  margin-bottom: 6px;
  font-weight: 600;
  font-size: 14px;
  color: #222;
}

.BaseSelect__field {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  background-color: white;
  appearance: none; /* removes default arrow for styling */
  -webkit-appearance: none;
  -moz-appearance: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.BaseSelect__field:focus {
  outline: none;
  border-color: var(--main-color);
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.15);
}

.BaseSelect__field:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

/* Mobile-friendly */
@media (max-width: 600px) {
  .BaseSelect__field {
    font-size: 16px;
    padding: 12px 14px;
  }
}
</style>
