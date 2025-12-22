<script setup lang="ts">
import { computed } from 'vue'

type Option = {
  value: string | number
  label: string
}

const props = defineProps<{
  modelValue: string | number
  options: Option[]
  name?: string
  customClass?: string
  disabled?: boolean
  gap?: string  // space between radio and label
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const groupName = computed(() => props.name || `radio-group-${Math.random().toString(36).substr(2, 9)}`)

const onChange = (value: string | number) => {
  emit('update:modelValue', value)
}

// style for gap
const gapStyle = computed(() => ({
  '--radio-gap': props.gap || '6px'
}))
</script>

<template>
  <div :class="['BaseRadioGroup', props.customClass]" :style="gapStyle">
    <div v-for="option in options" :key="option.value" class="BaseRadioGroup__option">
      <input
        type="radio"
        :id="`${groupName}-${option.value}`"
        :name="groupName"
        :value="option.value"
        :checked="modelValue === option.value"
        :disabled="props.disabled"
        @change="onChange(option.value)"
      />
      <label :for="`${groupName}-${option.value}`">{{ option.label }}</label>
    </div>
  </div>
</template>

<style scoped>
.BaseRadioGroup {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px; /* gap between options */
  font-family: 'Montserrat', sans-serif;
}

/* Each option: align radio and label */
.BaseRadioGroup__option {
  display: flex;
  align-items: center;
  gap: var(--radio-gap); /* space between radio and label */
}

/* Radio button */
.BaseRadioGroup__option input[type='radio'] {
  width: 18px;
  height: 18px;
  margin: 0;
  vertical-align: middle;
  cursor: pointer;
  accent-color: var(--main-color); /* modern color in supported browsers */
}

/* Label aligned perfectly */
.BaseRadioGroup__option label {
  cursor: pointer;
  font-size: 14px;
  line-height: 1.3;
  vertical-align: middle;
  user-select: none;
}

/* Mobile adjustments */
@media (max-width: 600px) {
  .BaseRadioGroup {
    flex-direction: column;
  }
  .BaseRadioGroup__option label {
    font-size: 16px;
  }
}
</style>