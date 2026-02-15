<script setup lang="ts">
// #region imports
    import { onMounted, ref } from 'vue'
    import PetitionMaker from '../Utilities/PetitionMaker'
    import BaseAlert from './BaseComponents/BaseAlert.vue';
    import BaseInput from './BaseComponents/BaseInput.vue';
    import BaseTextArea from './BaseComponents/BaseTextArea.vue';
    import BaseButton from './BaseComponents/BaseButton.vue';
    import BaseSelect from './BaseComponents/BaseSelect.vue';
    import BaseRadioGroup from './BaseComponents/BaseRadioGroup.vue';
    import BasePage from './BuildingBlocks/BasePage.vue';
    import BaseCard from './BaseComponents/BaseCard.vue';
    import type FormContent from '../interfaces/FormContent';
// #endregion imports

//#region variables
    //Object needed to fulfill the petition
    const petitionMaker:PetitionMaker = new PetitionMaker();

    //Variables for the form fields
    const documentType = ref('');
    const department = ref('');
    const description = ref('');
    const subject = ref('');

    //Variables for the alert
    const showAlert = ref(false);
    const alertMessage = ref('');
    const alertType = ref<'success' | 'error' | 'info'>('success');

    //Variable for storing the different departments
    const departments = ref<Array<{value:string, label:string}>>([]);
// #endregion variables

// #region Methods
    const spawnAlert = (type: 'success' | 'error' | 'info', message: string) => {
        alertType.value = type;
        alertMessage.value = message;
        showAlert.value = true;
    }

    const getDepartments = async () => {
        const response = await petitionMaker.makePetition("/api/general/currentDepartments", "GET");
        if(response.status == 200) {
            const data = response.data;
            
            for(const dept of data.departments) {
                if(dept.show) {
                    departments.value.push({value: dept.innerID, label: dept.name});
                }
            }
        }
    }
// #endregion Methods

// #region submitFunction
    const handleSubmit = async () => {
        if(!(!documentType.value || !department.value || !description.value || !subject.value)) { //Prevent empty fields
            const data:FormContent = {type: documentType.value, department: department.value, subject: subject.value, description: description.value};

            const response = await petitionMaker.makePetition("/api/form/newForm", "POST", data);

            if(response.status == 200) {
                location.href = "/Form/success"
            }
            else {
                spawnAlert("error", "Ha habido un problema. Por favor, inténtelo de nuevo más tarde");
            }
        }
        else {
            spawnAlert("error", "Por favor, complete todos los campos");
        }
    }
// #endregion submitFunction

// #region onMounted
    onMounted( async () => {
        await getDepartments();
    });
// #endregion onMounted 
</script>

<template>
    <BasePage show-content>
        <BaseAlert
                :show="showAlert"
                :type="alertType"
                :message="alertMessage"

                @close="showAlert = false"
            />

            <BaseCard customClass="FormHeader" top>
                <div class="FormIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"></path>
                    </svg>
                </div>
                
                <h2 class="FormHeaderText"> <b> Crear una solicitud </b></h2>
            </BaseCard>

            <BaseCard customClass="FormDiv" bottom>
                <form class="FormContent"  @submit.prevent="handleSubmit">
                    <div class="TypeSelection">
                        <p> <b> Indique el tipo de solicitud </b> </p>
                        <BaseRadioGroup
                            v-model="documentType"
                            name="DocumentType"
                            :options="[
                                { value: '1', label: 'Idea' },
                                { value: '2', label: 'Queja' },
                                { value: '3', label: 'Sugerencia' }
                            ]"
                            custom-class="MultiSelect_Type"
                            gap="5px"
                        />
                    </div>

                    <div class="Department">
                        <p> <b> Indique la subdelegación a la que se quiere dirigir </b> </p>

                        <BaseSelect
                          v-model="department"
                          label=""
                          placeholder="Selecciona una opción"
                          :options="departments"
                        />
                    </div>

                    <div class="Description">
                        <p> <b> Describa su solicitud </b> </p>
                        <BaseInput
                          v-model="subject"
                          name="Description"
                          placeholder="Asunto"
                          custom-class="Subject"
                        />
                        <BaseTextArea
                          v-model="description"
                          name="Description"
                          placeholder="Describa su solicitud..."
                          customClass="Explanation"
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

    .FormIcon {
        color: var(--primary);
        height:40px;
        width: 40px;
        margin-right: 10px;
    }

    .FormHeaderText {
        margin-bottom:5px;
        margin-top: 5px;
    }

    .FormDiv {
        /* Margins and padding */
        margin-bottom: 10px;
        padding-top: 20px;
    }

    .TypeSelection {
        /* Overall structure */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        /* Width and height */
        width: 90%;

        /* Borders */
        border-bottom: 2px solid var(--form-border);
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

    .Description{
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
    }

    .Subject {
        margin-bottom: 10px;
        width: 80%;
    }

    .Explanation {
        width: 80%;
    }

    .SubmitButton {
        margin-bottom: 20px;
    }

    .FormContent {
        width: 100%;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>