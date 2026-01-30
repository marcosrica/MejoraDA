<script setup>
import BaseCard from './BaseCard.vue';

defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])

function emitClose() {
  emit('close')
}
</script>

<template>
  <transition name="prompt-fade">
    <div v-if="show" class="prompt-overlay" @click.self="emitClose">
      <transition name="slide-up">
        <div class="prompt-card">
            <BaseCard top
                background-color="var(--primary-light)"
                > 
                <h1 class="title"> {{ title }} </h1>
            </BaseCard>
            <BaseCard bottom>
                <slot />
            </BaseCard>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
/* Greyed-out background */
.prompt-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Card styling */
.prompt-card {
  width: 90%;
  max-width: 520px;
  margin-bottom: 2rem;
}

.prompt-header {
  margin-bottom: 1rem;
}

.prompt-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Overlay fade */
.prompt-fade-enter-active,
.prompt-fade-leave-active {
  transition: opacity 0.25s ease;
}
.prompt-fade-enter-from,
.prompt-fade-leave-to {
  opacity: 0;
}

/* Slide-up animation */
.slide-up-enter-active {
  animation: slide-up-in 0.3s ease-out forwards;
}
.slide-up-leave-active {
  animation: slide-up-out 0.25s ease-in forwards;
}

@keyframes slide-up-in {
  from {
    transform: translateY(60px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-up-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(60px);
    opacity: 0;
  }
}

.title {
    margin: 0px;
    text-align: center;
}

</style>
