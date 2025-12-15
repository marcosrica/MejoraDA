<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <div class="Parent">
        <div class="TopBarDiv">
            <div class="PageID">
                <img src="./../assets/Logo.png" alt="MejoraDA Logo" class="ServiceLogo"/>
                <h1> MejoraDA </h1>
            </div>

            <img src="./../assets/Logo.png" alt="MejoraDA Logo" class="ServiceLogo"/>
        </div>
        <div class="ContentDiv">
            <div class="ToFormDiv">
              <p class="ToFormText"><b> Crear una solicitud </b></p>
              <button class="ToFormButton" onclick="location.href = '/Form'">Rellenar el formulario</button>
            </div>

            <div class="ToFormDiv">
              <p class="ToFormText"><b> Revisar los formularios </b></p>
              <button class="ToFormButton" onclick="location.href = '/Home'">Revisar los formularios</button>
            </div>
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
        align-items: center;
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
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    .PageID {
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        height: 100%;

        margin-left: 20px;
    }

    .ServiceLogo {
        height: 60%;
        margin-right: 15px;
    }

    .ContentDiv {
        /* Width and height */
        box-sizing: border-box;
        overflow-y: auto;
        width:100%;

        /* Overall structure */
        display:flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: top;

        /* Margins and paddings */
        margin-top: 12dvh;
        margin-bottom: 2dvh;
        padding-top: 15px;
        padding-bottom: 15px;
        padding-left: 5px;
        padding-right: 5px;
    }

    .ToFormDiv {
        /* Width and height */
        min-width: 80%;
        min-height: auto;

        /* Overall structure */
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        /* Colors */
        background-color: var(--panel-background);
        box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.921),
            0 2px 6px rgba(0, 0, 0, 0.284);
        border-radius: 10px;

        /* Margins and padding */
        margin-bottom: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .ToFormButton {
      background-color: var(--main-color);
      color: black;
      font-family: 'Montserrat', sans-serif;
      font-size: large;
      font-weight: 700;
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      cursor: pointer;
    }

    .ToFormText {
      font-family: 'Montserrat', sans-serif;
      font-size: x-large;
      margin-bottom: 10px;
    }
</style>
