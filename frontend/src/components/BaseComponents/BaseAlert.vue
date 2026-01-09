<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  show: boolean
  type?: 'success' | 'error' | 'info'
  message: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const alertClass = computed(() => [
  'BaseAlert',
  `BaseAlert--${props.type ?? 'info'}`,
])
</script>

<template>
  <Transition name="alert">
    <div v-if="show" :class="alertClass">
      <span class="BaseAlert__icon">
        <template v-if="type === 'success'">✔</template>
        <template v-else-if="type === 'error'">✖</template>
        <template v-else>ℹ</template>
      </span>

      <p class="BaseAlert__message">{{ message }}</p>

      <button class="BaseAlert__close" @click="emit('close')">
        ×
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.BaseAlert {
  position: fixed;
  top: 90px;
  right: 20px;

  display: flex;
  align-items: center;
  gap: 12px;

  padding: 14px 18px;
  border-radius: 12px;
  min-width: 260px;

  box-shadow:
    0 6px 18px rgba(0, 0, 0, 0.2);

  font-family: 'Montserrat', sans-serif;
  font-size: 14px;

  z-index: 9999;
}

@media (max-width: 400px) {
  .BaseAlert {
    left: 20px;
  }
}


/* Variants */
.BaseAlert--success {
  background-color: #e6f8ee;
  color: #1b7f43;
}

.BaseAlert--error {
  background-color: #fdecea;
  color: #a61b1b;
}

.BaseAlert--info {
  background-color: #eef4ff;
  color: #2448a5;
}

.BaseAlert__icon {
  font-size: 18px;
}

.BaseAlert__message {
  flex: 1;
}

.BaseAlert__close {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: inherit;
}

/* Animation */
.alert-enter-active,
.alert-leave-active {
  transition: all 0.3s ease;
}

.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
