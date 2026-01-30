<script setup lang="ts">

const props = defineProps<{
  customClass?: string,
  backgroundColor?: string,
  borderColor?: string,
  top?: boolean,
  bottom?: boolean,
  bottom_left?: boolean,
  bottom_right?: boolean
}>()

</script>

<template>
  <div 
    :class="['BaseCard', customClass, top ? 'TOP' : '', bottom ? 'BOTTOM' : '', bottom_left ? 'BOTTOM_LEFT' : '', bottom_right ? 'BOTTOM_RIGHT' : '']"
    :style="{
      '--base-card-bg': backgroundColor,
      '--base-card-border': borderColor
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.BaseCard {
  background-color: var(--base-card-bg, var(--card-background));
  border: 2px solid var(--base-card-border, rgba(255, 255, 255, 0));
  padding: 16px;
  margin-bottom: 10px;

  box-shadow: var(--card-shadow);

  display: flex;
  flex-direction: column;
  gap: 12px;
}

.TOP {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.BOTTOM {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

.BOTTOM_LEFT {
  border-bottom-left-radius: 12px;
}

.BOTTOM_RIGHT {
  border-bottom-right-radius: 12px;
}
</style>
