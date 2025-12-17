<script setup lang="ts">
    import { ref } from 'vue'
    import PetitionMaker from '../Utilities/PetitionMaker'

    const petitionMaker:PetitionMaker = new PetitionMaker();

    const documentType = ref('')
    const department = ref('General')
    const description = ref('')

    const handleSubmit = async () => {
      const formData = {
        documentType: documentType.value,
        department: department.value,
        description: description.value,
      }

      if(!(!formData.documentType || !formData.department || !formData.description)) { //Prevent empty fields
        console.log('Submitted data:', formData)
        const response = await petitionMaker.makePetition("/api/newForm", "POST", formData);
        console.log('Response:', response);
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
            <div class="FormHeader">
                <div class="FormIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"></path>
                    </svg>
                </div>
                
                <h2 class="FormHeaderText"> <b> Crear una solicitud </b></h2>
            </div>
            <form class="FormDiv"  @submit.prevent="handleSubmit">
                <p> <b> Indique el tipo de solicitud </b> </p>
                <div class="MultiSelect_Type">
                    <div class="Multioption">
                        <input type="radio" id="Idea" name="DocumentType" value="Idea" v-model="documentType"></input>
                        <label for="Idea">Idea</label>
                        <br>
                    </div>
                    
                    <div class="Multioption">
                        <input type="radio" id="Complaint" name="DocumentType" value="Complaint" v-model="documentType"></input>
                        <label for="Complaint">Queja</label>
                        <br>
                    </div>

                    <div class="Multioption">    
                        <input type="radio" id="Suggestion" name="DocumentType" value="Suggestion" v-model="documentType"></input>
                        <label for="Suggestion">Sugerencia</label>
                        <br>
                    </div>
                </div>
                
                <div class="Department">
                    <p> <b> Indique la subdelegación a la que se quiere dirigir </b> </p>

                    <select name="Departments" id="Departments" v-model="department">
                        <option value="General"> General </option>
                        <option value="AtencionEstudiante"> Subdelegación de Ayuda y Servicios para el Estudiante </option>
                        <option value="Comunicacion"> Subdelegación de Comunicación </option>
                        <option value="Calidad"> Subdelegación de Mediación y Calidad Académica </option>
                        <option value="TIC"> Subdelegación de Estrategia y Desarrollo Tecnológico </option>
                        <option value="Eventos"> Subdelegación de Eventos </option>
                        <option value="Igualdad"> Subdelegación de Bienestar e Igualdad Social </option>
                    </select>
                </div>

                <div class="Description">
                    <p> <b> Describa su solicitud </b> </p>
                    <textarea class="Explanation" name="Description" id="Description" rows="10" placeholder="Escriba aquí su solicitud..." v-model="description"></textarea>
                </div>

                <div class="SubmitDiv">
                    <button type="submit"> <b> Enviar solicitud </b> </button>
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

    .FormHeader {
        /* Width and height */
        min-width: 80%;
        min-height: auto;

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

    .Explanation {
        width: 80%;
        border: 5px solid var(--element-border);
        border-radius: 10px;
    }
</style>