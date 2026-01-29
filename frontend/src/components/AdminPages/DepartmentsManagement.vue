<script setup lang="ts">
    import { ref } from 'vue'
    import PetitionMaker from '../../Utilities/PetitionMaker'
    import BaseAlert from '../BaseComponents/BaseAlert.vue'; //For showing when the form has been submitted successfully
    import BasePage from '../BuildingBlocks/BasePage.vue';
    import BaseCard from '../BaseComponents/BaseCard.vue';
    import BaseButton from '../BaseComponents/BaseButton.vue';
import type SubdelegationsInfo from '../../interfaces/SubdelegationsInfo';
import BaseInput from '../BaseComponents/BaseInput.vue';

    //Object needed to fulfill the petition
    const petitionMaker:PetitionMaker = new PetitionMaker();

    //Handles authentication
    const showContent = ref(true); //TODO: Temporary value for testing

    //Variables for the alert
    const showAlert = ref(false);
    const alertMessage = ref('');
    const alertType = ref<'success' | 'error' | 'info'>('success');

    //Variables for the new department form
    const departmentName = ref('');
    const departmentInnerName = ref('');

    //Data for the departments list
    const departments = ref<Array<SubdelegationsInfo>>([
        {name:"General", internalName: "General"},
        {name:"Subdelegación de Ayuda y Servicios para el Estudiante", internalName: "AtencionEstudiante"},
        {name:"Subdelegación de Comunicación", internalName: "Comunicacion"},
        {name:"Subdelegación de Mediación y Calidad Académica", internalName: "Calidad"},
        {name:"Subdelegación de Estrategia y Desarrollo Tecnológico", internalName: "TIC"},
        {name:"Subdelegación de Eventos", internalName: "Eventos"},
        {name:"Subdelegación de Bienestar e Igualdad Social", internalName: "Igualdad"},
    ]);
</script>

<template>
    <BasePage v-if="showContent">
        <BaseAlert
            :show="showAlert"
            :type="alertType"
            :message="alertMessage"

            @close="showAlert = false"
        />

        <!-- Manage current departments -->
        <!-- Header of section -->
        <BaseCard custom-class="Header" top>
            <h1 class="HeaderText">Administración de subdelegaciones</h1>
        </BaseCard>
        <!-- Panel with departments -->
        <div class="Grid">
            <BaseCard
            custom-class="Card"
            v-for="(card) in departments">
                <div class="UserCard">
                    <h2 class="marginlessText">{{ card.name }}</h2>
                    <p class="marginlessText">{{card.internalName}}</p>
                </div>
                <div class="CardButtons">
                    <BaseButton
                        custom-class="DeleteButton"
                        variant="primary"
                        @click=""
                    >
                        Editar subdelegación
                    </BaseButton>
                    <BaseButton
                        custom-class="DeleteButton"
                        variant="danger"
                        @click=""
                    >
                        Eliminar subdelegación
                    </BaseButton>
                </div>
                
            </BaseCard>
        </div>
        <!-- End of section with visual closing -->
        <BaseCard custom-class="CurrentUser" bottom>
        </BaseCard>

        <!-- Header of adding the department panel -->
        <BaseCard top class="FormHeader">
            <h1 class="HeaderText"> Añadir una nueva subdelegación </h1>
        </BaseCard>
        <!-- Form content -->
        <BaseCard bottom class="FormHeader">
            <form class="FormWrapper">
                <div class="FormDiv">
                    <p class="FormText"> <b> Nombre de la subdelegación: </b> </p>
                    <BaseInput
                        v-model="departmentName"
                        name="Description"
                        placeholder="Nombre"
                        custom-class="formInput">
                    </BaseInput>
                </div>
                <div class="FormDiv SecondDiv">
                    <p class="FormText"> <b> Nombre interno: </b> </p>
                    <BaseInput
                        v-model="departmentInnerName"
                        name="Description"
                        placeholder="Nombre interno"
                        custom-class="formInput">
                    </BaseInput>
                </div>
                <div class="submitDiv">
                    <BaseButton
                    type="submit">
                        Añadir subdelegación
                    </BaseButton>
                </div>
            </form>
        </BaseCard>
    </BasePage>

    <div v-if="!showContent">
        <h1> 401 Acceso denegado </h1>
    </div>
</template>

<style scoped>
    .marginlessText {
        margin: 0;
    }

    /* #region Header */

    .Header {
        margin-bottom: 10px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .HeaderText {
        margin: 0;
        text-align: center;
    }

    /* #endregion */

    /* #region Grid */
    .Grid {
        width: 100%;

        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 10px;
    }

    .Card {
        padding: 1rem;
        margin-bottom: 0px;
        transition: transform 0.2s ease, box-shadow 0.2s ease;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .Card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
    }

    .CardButtons {
        box-sizing: border-box;
        width: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        gap: 5px;
    }

    .DeleteButton {
        width: 80%;
    }

    .CurrentUser {
        margin-top: 10px;
        margin-bottom: 2rem;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    /* #endregion */

    /* #region Add */

    .FormHeader {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .FormWrapper {
        width: 90%;
        
        @media(orientation: portrait) {
            width: 95%;
        }
        @media(orientation: landscape) {
            @media(max-width: 1000px) {
                width: 90%;
            }
            @media(max-width: 1300px) {
                width: 75%;
            }
            @media(min-width: 1550px) {
                width: 70%;
            }
        }
    }

    .FormDiv {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        padding-bottom: 5px;
        border-bottom: 1px solid var(--form-border);
    }

    .SecondDiv {
        margin-top: 10px;
        border-bottom: 0px;
    }

    .FormText {
        font-size: 20px;

        margin-top: 5px;
        margin-bottom: 5px;
    }

    .formInput {
        width: 50%;
    }

    .submitDiv {
        box-sizing: border-box;
        width: 100%;
        margin-top: 10px;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    /* #endregion */
</style>