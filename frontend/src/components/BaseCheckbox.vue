<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  label?: string
  name?: string
  id?: string
  disabled?: boolean
  customClass?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const checkboxId = computed(
  () => props.id || `checkbox-${Math.random().toString(36).slice(2, 10)}`
)

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (!target) return
  emit('update:modelValue', target.checked)
}
</script>

<template>
  <div :class="['BaseCheckbox', customClass]">
    <input
      type="checkbox"
      :id="checkboxId"
      :name="name"
      :checked="modelValue"
      :disabled="disabled"
      @change="onChange"
    />
    <label v-if="label" :for="checkboxId">
      {{ label }}
    </label>
  </div>
</template>

<style scoped>
.BaseCheckbox {
  display: flex;
  align-items: center;
  gap: 10px;

  font-family: 'Montserrat', sans-serif;
  color: var(--text-color);
}

/* Checkbox styling */
.BaseCheckbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  margin: 0;
  cursor: pointer;

  accent-color: var(--main-color);
}

/* Label styling */
.BaseCheckbox label {
  cursor: pointer;
  font-size: 14px;
  line-height: 1.3;
  user-select: none;
}

/* Disabled state */
.BaseCheckbox input:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.BaseCheckbox input:disabled + label {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Mobile */
@media (max-width: 600px) {
  .BaseCheckbox label {
    font-size: 16px;
  }
}
</style>
