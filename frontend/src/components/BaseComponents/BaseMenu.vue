<script>
export default {
  name: "BaseMenu",
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<template>
  <div class="menu" :class="{ open: isOpen }">
    <button class="close" @click="$emit('close')">×</button>

    <div class="MenuInnerPanel">
      <h3 class="MenuHeader">Menú</h3>
      <div class="MenuOptions">
        <div class="MenuOption">Página principal</div>
        <div class="MenuOption">Revisión de formularios</div>
        <div class="MenuOption">Panel de administración</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100dvh;

  box-sizing: border-box;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 1000;

  background-color: var(--menu-background);
  color: black;
  padding: 1rem;

  border-right: 5px solid var(--menu-border);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.menu.open {
  transform: translateX(0);
}

.close {
  background: none;
  border: none;
  color: black;
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: 1rem;
  border-radius: 10px;
  transition: 0.4 ease;
}

.close:hover {
  background-color: var(--menu-hover);
  border-radius: 20px;
}

.MenuHeader {
  font-family: 'Montserrat', sans-serif;
  font-size: x-large;
  margin-bottom: 1rem;
}

.MenuInnerPanel {
  box-sizing: border-box;
  width: 100%;
  
  display: flex;
  flex-direction: column;
}

.MenuOptions {
  box-sizing: border-box;
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  gap: 10px;
}

.MenuOption {
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.4s ease;
}

.MenuOption:hover {
  background-color: var(--menu-hover);
}
</style>
