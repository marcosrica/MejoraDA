<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import BaseCard from '../BaseComponents/BaseCard.vue';
import BasePage from '../BuildingBlocks/BasePage.vue';
import BaseInput from '../BaseComponents/BaseInput.vue';
import BaseButton from '../BaseComponents/BaseButton.vue';
import PetitionMaker from '../../Utilities/PetitionMaker';

import type LoginData from '../../interfaces/LoginData';
import BaseAlert from '../BaseComponents/BaseAlert.vue';

const petitionMaker:PetitionMaker = new PetitionMaker();

//Variables to configure the alert
const showAlert = ref<boolean>(false);
const alertType = "error";
const alertMessage = ref<string>("");

//Variables for the form fields
const user = ref('');
const password = ref('');

const triggerError = (message:string) => {
    alertMessage.value = message;

    showAlert.value = true;
} 

const handleSubmit = async () => {
    console.log("User wants to log in: " + user.value + ", password: " + password.value);

    const loginData:LoginData = {
        user: user.value,
        password: password.value
    }

    if(!loginData.user) {
        triggerError("Por favor, indique el usuario");
    }
    else {
        if(!loginData.password) {
            triggerError("Por favor, indique la contraseña");
        }
        else {
            const response = await petitionMaker.makePetition("/api/auth/adminLogin", 'POST', loginData);

            if(response.status == 200) {
                location.href = "/admin/review"
            }
            else {
                triggerError("Las credenciales no son correctas. Por favor, revíselas y vuelva a intentarlo");
            }
        }
    }
}

onMounted(async () => {
    const response = await petitionMaker.makeGetPetition("/api/auth/amIPrivileged");

    if(response.status == 200) {
        location.href = "/admin/review";
    }
})
</script>

<template>
    <BasePage show-content>
        <BaseAlert 
            :show="showAlert"
            :type="alertType"
            :message="alertMessage"

            v-on:close="showAlert = false"
        />

        <BaseCard top>
            <h1 class="marginless"> Área de administración </h1>
            <p class="marginless"> Introduce tus credenciales para continuar </p>
            <p class="marginless disclaimer"> Esto es un panel exclusivo para miembros de la delegación, y aquí sí que se guardan registros. Si no eres parte del equipo, vuelve a la página de inicio </p>
        </BaseCard>

        <BaseCard bottom>
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