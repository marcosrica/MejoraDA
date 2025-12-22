<script setup lang="ts">
    import { ref } from 'vue'
    import PetitionMaker from '../Utilities/PetitionMaker'
    import BaseAlert from './BaseAlert.vue'; //For showing when the form has been submitted successfully
    import BaseInput from './BaseInput.vue';
    import BaseTextArea from './BaseTextArea.vue';
import BaseButton from './BaseButton.vue';
import BaseSelect from './BaseSelect.vue';
import BaseRadioGroup from './BaseRadioGroup.vue';

    //Object needed to fulfill the petition
    const petitionMaker:PetitionMaker = new PetitionMaker();

    //Variables for the form fields
    const documentType = ref('');
    const department = ref('General');
    const description = ref('');
    const subject = ref('');

    //Variables for the alert
    const showAlert = ref(false);
    const alertMessage = ref('');
    const alertType = ref<'success' | 'error' | 'info'>('success');

    const handleSubmit = async () => {
        const formData = {
          documentType: documentType.value,
          department: department.value,
          subject: subject.value,
          description: description.value,
        }

        if(!(!formData.documentType || !formData.department || !formData.description || !formData.subject)) { //Prevent empty fields
          console.log('Submitted data:', formData);
          const response = await petitionMaker.makePetition("/api/newForm", "POST", formData);

          if(response.status == 200) {
            alertType.value = "success";
            alertMessage.value = "Su petición ha sido registrada correctamente.";
            showAlert.value = true;
          }
        }
        else {
            alertType.value = "error";
            alertMessage.value = "Por favor, complete todos los campos";
            showAlert.value = true;
        }
    }
</script>

<template>
    <div class="Parent">
        <div class="TopBarDiv">
            <div class="PageID" onclick="location.href = '/'">
                <img src="./../assets/Logo.png" alt="MejoraDA Logo" class="ServiceLogo"/>
                <h1> MejoraDA </h1>
            </div>

            <img src="./../assets/Logo.png" alt="MejoraDA Logo" class="ServiceLogo"/>
        </div>
        <div class="ContentDiv">
            <BaseAlert
                :show="showAlert"
                :type="alertType"
                :message="alertMessage"

                @close="showAlert = false"
            />

            <div class="FormWrapper">
                <div class="FormHeader">
                    <div class="FormIcon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"></path>
                        </svg>
                    </div>

                    <h2 class="FormHeaderText"> <b> Crear una solicitud </b></h2>
                </div>

                <form class="FormDiv"  @submit.prevent="handleSubmit">
                    <div class="TypeSelection">
                        <p> <b> Indique el tipo de solicitud </b> </p>
                        <BaseRadioGroup
                            v-model="documentType"
                            name="DocumentType"
                            :options="[
                                { value: 'Idea', label: 'Idea' },
                                { value: 'Complaint', label: 'Queja' },
                                { value: 'Suggestion', label: 'Sugerencia' }
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
                          :options="[
                            { value: 'General', label: 'General' },
                            { value: 'AtencionEstudiante', label: 'Subdelegación de Ayuda y Servicios para el Estudiante' },
                            { value: 'Comunicacion', label: 'Subdelegación de Comunicación' },
                            { value: 'Calidad', label: 'Subdelegación de Mediación y Calidad Académica' },
                            { value: 'TIC', label: 'Subdelegación de Estrategia y Desarrollo Tecnológico' },
                            { value: 'Eventos', label: 'Subdelegación de Eventos' },
                            { value: 'Igualdad', label: 'Subdelegación de Bienestar e Igualdad Social' }
                          ]"
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

    .FormWrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 80%; /* Controls the width of both header and form */
    }

    @media (orientation: landscape) {
      .FormWrapper {
        width: 80%;
      }
    }
    @media (orientation: portrait) {
      .FormWrapper {
        width: 95%;
      }
    }

    .FormHeader {
        /* Width and height */
        min-height: auto;
        width: 100%;

        /* Overall structure */
        display:flex;
        flex-direction: row;
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

    .FormIcon {
        color: var(--icon-color);
        height:40px;
        width: 40px;
        margin-right: 10px;
    }

    .FormHeaderText {
        margin-bottom:5px;
        margin-top: 5px;
    }

    .FormDiv {
        /* Overall structure */
        display:flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        
        /* Width and height */
        width: 100%;
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
</style>