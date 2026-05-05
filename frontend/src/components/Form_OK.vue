<script setup lang="ts">
// #region imports
    import BaseButton from './BaseComponents/BaseButton.vue';
    import BasePage from './BuildingBlocks/BasePage.vue';
    import BaseCard from './BaseComponents/BaseCard.vue';
// #endregion imports


// #region Methods
    const goToIndex = () => {
        location.href = "/";
    }

    const newForm = () => {
        location.href = "/form";
    }
// #endregion Methods
</script>

<template>
    <BasePage show-content>
        <BaseCard customClass="FormHeader" top>                
            <h2 class="FormHeaderText"> <b> Solicitud registrada correctamente </b></h2>
        </BaseCard>

        <BaseCard customClass="FormDiv" bottom>
            <p class="text"> La solicitud ha sido registrada correctamente en el servidor, y ya se ha avisado a la subdelegación correspondiente. </p>
            <p class="text"> ¡Muchas gracias por tu colaboración! </p>
            <div class="Emoji"> 😁 </div>

            <p class="text"> Puedes rellenar otra solicitud, o volver a la página de inicio. </p>
            <div class="buttons"> 
                <BaseButton variant="primary" @click="newForm">
                    <p class="text">Rellenar otra solicitud</p>
                </BaseButton>
                <BaseButton variant="primary" @click="goToIndex">
                    <p class="text">Volver al inicio</p>
                </BaseButton>
            </div>
        </BaseCard>
    </BasePage>
</template>

<style scoped>
    .FormHeader {
        /* Overall structure */
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        

        /* Margins and padding */
        margin-bottom: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .FormHeaderText {
        margin-bottom:5px;
        margin-top: 5px;
        text-align: center;
    }

    .Emoji {
        box-sizing: border-box;
        width: 100%;

        text-align: center;
        font-size: 8rem;
    }

    .text {
        margin-top: 0px;
        margin-bottom: 5px;
        text-align: center;
        font-size: 20px;
    }

    .buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
        box-sizing: border-box;
        width: 100%;
        gap: 20px;
    }
</style>