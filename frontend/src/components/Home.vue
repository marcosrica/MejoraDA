<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
    <div class="Parent">
        <div class="TopBarDiv">
            <h1> MejoraDA </h1>
        </div>
        <div class="ContentDiv">
            <div class="SpaceAligner"></div>
            <input type="button" @click="count++" :value="`Count is ${count}`" />
        </div>
    </div>
</template>

<style scoped>
    .Parent {
        background-color: var(--background);
        width: 100dvw;
        height: 100dvh;

        display: flex;
        flex-direction: column;
    }

    .TopBarDiv {
        background-color: var(--main-color);
        box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.921),
            0 2px 6px rgba(0, 0, 0, 0.284);

        width: 100%;
        height: 10%;

        position: fixed;
        top: 0;

        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    .SpaceAligner {
        height: 12dvh;
    }

    .ContentDiv {
        flex: 1;
        overflow-y: auto;

        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: top;
    }
</style>
