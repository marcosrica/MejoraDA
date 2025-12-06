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
            <div class="FormHeader">
                <h2 class="FormHeaderText"> <b> Crear una solicitud </b></h2>
                <p class="FormSigner"> A nombre de </p>
            </div>
            <form class="FormDiv">
                <p> <b> Indique el tipo de solicitud </b> </p>
                <div class="MultiSelect_Type">
                    <div class="Multioption">
                        <input type="radio" id="Idea" name="DocumentType" value="Idea"></input>
                        <label for="Idea">Idea</label>
                        <br>
                    </div>
                    
                    <div class="Multioption">
                        <input type="radio" id="Queja" name="DocumentType" value="Queja"></input>
                        <label for="Queja">Queja</label>
                        <br>
                    </div>

                    <div class="Multioption">    
                        <input type="radio" id="Sugerencia" name="DocumentType" value="Sugerencia"></input>
                        <label for="Sugerencia">Sugerencia</label>
                        <br>
                    </div>
                </div>
                <div class="Department">
                    <p> <b> Indique la subdelegación a la que se quiere dirigir </b> </p>

                    <select name="Departments" id="Departments">
                        <option value="General"> General </option>
                        <option value="Calidad"> Subdelegación de Mediación y Calidad Académica </option>
                        <option value="Comunicacion"> Subdelegación de Comunicación </option>
                        <option value="AtencionEstudiante"> Subdelegación de Ayuda y Servicios para el Estudiante </option>
                        <option value="Igualdad"> Subdelegación de Bienestar e Igualdad Social </option>
                        <option value="TIC"> Subdelegación de Estrategia y Desarrollo Tecnológico </option>
                        <option value="Eventos"> Subdelegación de Actividades Culturales </option>
                    </select>
                </div>
            </form>
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
        flex-direction: column;
        align-items: center;
        justify-content: center;

        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
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

    .FormHeader {
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
    }

    .FormHeaderText {
        margin-bottom:0px
    }

    .FormSigner {
        margin-top: 0px;
    }

    .FormDiv {
        /* Overall structure */
        display:flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        
        /* Width and height */
        min-width: 80%;
        min-height: auto;

        /* Colors */
        background-color: var(--panel-background);
        box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.921),
            0 2px 6px rgba(0, 0, 0, 0.284);
        border-radius: 10px;

        /* Margins and padding */
        margin-bottom: 10px;
        padding-top: 20px;
    }

    .MultiSelect_Type {
        /* Overall structure */
        display:flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-around;

        /* Width and height */
        width: 90%;

        /* Margins and padding */
        margin-bottom: 10px;
        padding-bottom: 15px;

        /* Borders */
        border-bottom: 2px solid var(--form-border);
    }

    .Department{
        /* Width and height */
        width: 90%;

        /* Overall structure */
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        /* Margins and padding */
        margin-bottom: 10px;
        padding-bottom: 15px;

        /* Borders */
        border-bottom: 2px solid var(--form-border);
    }
</style>
