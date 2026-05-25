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
  /* Update padding to add room on the right for the arrow (12px left, 36px right) */
  padding: 10px 36px 10px 12px; 
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  background-color: white;
  
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  
  /* --- ADDED PROPERTIES FOR THE ARROW --- */
  /* Clean, modern chevron icon encoded directly into CSS (stroke color is #666) */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666' stroke-width='2.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' /%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center; /* Positions arrow 12px from the right edge */
  background-size: 14px; /* Adjust scale of the arrow */
  
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-image 0.2s ease;
}

.BaseSelect__field:focus {
  outline: none;
  border-color: var(--main-color);
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.15);
  
  /* OPTIONAL: Changes arrow color to a nice digital blue (#007bff) on focus */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23007bff' stroke-width='2.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' /%3E%3C/svg%3E");
}

.BaseSelect__field:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

/* Mobile-friendly */
@media (max-width: 600px) {
  .BaseSelect__field {
    font-size: 16px;
    padding: 12px 36px 12px 14px; /* Ensure 36px right padding persists */
  }
}
</style>
