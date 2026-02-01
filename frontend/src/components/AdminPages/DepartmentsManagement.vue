<script setup lang="ts">
// #region imports
    import { onMounted, ref } from 'vue'
    import PetitionMaker from '../../Utilities/PetitionMaker'
    import BaseAlert from '../BaseComponents/BaseAlert.vue';
    import BasePage from '../BuildingBlocks/BasePage.vue';
    import BaseCard from '../BaseComponents/BaseCard.vue';
    import BaseButton from '../BaseComponents/BaseButton.vue';
    import type SubdelegationsInfo from '../../interfaces/SubdelegationsInfo';
    import BaseInput from '../BaseComponents/BaseInput.vue';
    import BasePrompt from '../BaseComponents/BasePrompt.vue';
// #endregion imports

// #region variables
    //Object needed to fulfill the petition
    const petitionMaker:PetitionMaker = new PetitionMaker();

    //Handles authentication
    const showContent = ref(true); //TODO: Temporary value for testing

    //Variables for the alert
    const showAlert = ref(false);
    const alertMessage = ref('');
    const alertType = ref<'success' | 'error' | 'info'>('success');

    //Variables for controlling the prompt
    const showPrompt = ref(false);
    const promptName = ref('');
    const promptInnerName = ref('');

    //Variables for the new department form
    const departmentName = ref('');
    const departmentInnerName = ref('');

    //Data for the departments list
    const departments = ref<Array<SubdelegationsInfo>>([]);

// #endregion variables

// #region functions
    //Function for showing the prompt when the edit button is clicked
    const enablePrompt = (name:string, innerName:string) => {
        promptName.value = name;
        promptInnerName.value = innerName;
        showPrompt.value = true;
    }

    const enableAlert = (message:string, type:'success' | 'error' | 'info') => {
        alertMessage.value = message;
        alertType.value = type;
        showAlert.value = true;
    }

    const deleteDepartment = async (name:string, internalName:string) => {
        console.log("Should delete the department with internal name: " + internalName);
        const data:SubdelegationsInfo = {
            name: name,
            internalName: internalName
        };

        const result = await petitionMaker.makePetition("/api/departments/deleteDepartment", "POST", data);

        if(result.status == 200) {
            enableAlert('Subdelegación eliminada correctamente.', 'success');

            //Refresh the departments list
            await getDepartments();
        } else {
            enableAlert('Error al eliminar la subdelegación.', 'error');
        }
    }

    const departmentEditAccepted = async () => {
        console.log("Should edit the department");
        const data:SubdelegationsInfo = {
            name: promptName.value,
            internalName: promptInnerName.value
        };

        const result = await petitionMaker.makePetition("/api/departments/editDepartment", "POST", data);
        if(result.status == 200) {
            enableAlert('Subdelegación editada correctamente.', 'success');

            //Refresh the departments list
            await getDepartments();
        } else {
            enableAlert('Error al editar la subdelegación.', 'error');
        }

        showPrompt.value = false;
    }

    const addDepartment = async () => {
        console.log("Should add the department");
        const data:SubdelegationsInfo = {
            name: departmentName.value,
            internalName: departmentInnerName.value
        };

        const result = await petitionMaker.makePetition("/api/departments/newDepartment", "POST", data);
        if(result.status == 200) {
            enableAlert("Subdelegación añadida correctamente.", 'success');

            //Refresh the departments list
            await getDepartments();
        } else {
            enableAlert("Error al añadir la subdelegación.", 'error');
        }

        await getDepartments();
    }

    const checkAuth = async () => {
        const authResponse = await petitionMaker.makePetition('/api/auth/amIPrivileged', 'GET');
        showContent.value = authResponse.status == 200;
    }

    const getDepartments = async () => {
        const response = await petitionMaker.makePetition("/api/general/currentDepartments", "GET");
        console.log(response);
        departments.value = response.data.departments;
    }
// #endregion functions

// #region on mounted (Entry point)

onMounted( async () => {
    await checkAuth();

    if(showContent.value) {
        await getDepartments();
    }
});

// #endregion on mounted (Entry point)
</script>

<template>
    <BasePage :show-content="showContent">
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
                        @click="enablePrompt(card.name, card.internalName)"
                    >
                        Editar subdelegación
                    </BaseButton>
                    <BaseButton
                        custom-class="DeleteButton"
                        variant="danger"
                        @click="deleteDepartment(card.name, card.internalName)"
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
            <form class="FormWrapper" @submit.prevent="addDepartment">
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


        <!-- Prompt for editing -->
        <BasePrompt :show="showPrompt"
        title="Editar subdelegación">
            <form  @submit.prevent="departmentEditAccepted">
                <div class="EditFormDiv notFinalEditFormDiv">
                    <p class="editFormText"> <b> Nombre de la subdelegación: </b> </p>
                    <BaseInput class="EditFormInput"
                        v-model="promptName"
                        name="New name of the department"
                        placeholder="Nombre de la delegación"
                        custom-class="formInput">
                    </BaseInput>
                </div>
                <div class="EditFormDiv">
                    <p class="editFormText"> <b> Nombre interno de la subdelegación: </b> </p>
                    <BaseInput class="EditFormInput"
                        v-model="promptInnerName"
                        name="New inner name for the department"
                        placeholder="Nombre interno de la delegación"
                        custom-class="formInput">
                    </BaseInput>
                </div>
                <div class="EditFormDiv">
                    <BaseButton variant="primary"
                        type="submit">
                        Aceptar cambios
                    </BaseButton>
                </div>
            </form>
            <BaseButton variant="danger" @click="showPrompt=false">
                Cancelar
            </BaseButton>
        </BasePrompt>
    </BasePage>
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


    /* #region editForm */

    .EditFormDiv {
        margin-top: 10px;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .notFinalEditFormDiv {
        padding-bottom: 10px;
        border-bottom: 2px solid var(--form-border);
        margin-bottom: 10px;
        margin-top: 0px;
    }

    .editFormText {
        margin: 0px;
        text-align: center;
        font-size: 18px;
    }

    .EditFormInput {
        box-sizing: border-box;
        width: 100%;
    }

    /* #endregion */
</style>