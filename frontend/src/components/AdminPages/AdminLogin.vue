<script lang="ts" setup>
import { ref } from 'vue';

import BaseCard from '../BaseComponents/BaseCard.vue';
import BasePage from '../BuildingBlocks/BasePage.vue';
import BaseInput from '../BaseComponents/BaseInput.vue';
import BaseButton from '../BaseComponents/BaseButton.vue';

//Variables for the form fields
const user = ref('');
const password = ref('');

const handleSubmit = () => {

}
</script>

<template>
    <BasePage show-content>
        <BaseCard top>
            <h1 class="marginless"> Área de administración </h1>
            <p class="marginless"> Introduce tus credenciales para continuar </p>
            <p class="marginless disclaimer"> Esto es un panel exclusivo para miembros de la delegación, y aquí sí que se guardan registros. Si no eres parte del equipo, vuelve a la página de inicio </p>
        </BaseCard>

        <BaseCard>
            <form class="FormContent"  @submit.prevent="handleSubmit">
                    <div class="prompt firstPrompt">
                        <p> <b> Usuario </b> </p>
                        <BaseInput
                          v-model="user"
                          name="Usuario"
                          placeholder="Nombre de usuario"
                          custom-class="inputDiv"
                        />
                    </div>

                    <div class="prompt">
                        <p> <b> Contraseña </b> </p>
                        <BaseInput
                          v-model="password"
                          name="Contraseña"
                          placeholder="Contraseña"
                          custom-class="inputDiv"
                          type="password"
                        />
                    </div>

                    <div class="SubmitDiv">
                        <BaseButton type="submit" variant="primary" customClass="SubmitButton">
                            <b>Enviar solicitud</b>
                        </BaseButton>
                    </div>
                </form>
        </BaseCard>
    </BasePage>
</template>

<style scoped>
.marginless {
    margin: 0px;
    text-align: center;
}

.disclaimer {
    color: red;
    font-style: italic;
}

.FormContent {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.prompt{
    width: 80%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 15px;
}

.firstPrompt {
    border-bottom: 2px solid var(--form-border);
}

.inputDiv {
    margin-bottom: 10px;
    width: min(400px, 90%);
}
</style>