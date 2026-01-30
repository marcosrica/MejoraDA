<script lang="ts" setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
 
import PetitionMaker from '../Utilities/PetitionMaker';

import BaseAlert from './BaseComponents/BaseAlert.vue';
import BaseCard from './BaseComponents/BaseCard.vue';
import BasePage from './BuildingBlocks/BasePage.vue';
import BaseButton from './BaseComponents/BaseButton.vue';
import BaseInput from './BaseComponents/BaseInput.vue';
import BaseDepartmentWrapper from './BaseComponents/BaseDepartmentWrapper.vue';
import type SubdelegationsInfo from '../interfaces/SubdelegationsInfo';

//Class that holds the method to make petitions to the backend
const petitionMaker:PetitionMaker = new PetitionMaker();

//Variables for the alert
const displayAlert = ref(false);
const alertMessage = ref('');
const alertType = ref<'success' | 'error' | 'info'>('success');

//Variables for generally managing the subdelegations panel
const EditingSubdelegation = ref(false);
//const SubdelegationsList = ref(["Subdelegación de Ayuda y Servicios Para el Estudiante", "Subdelegación de Comunicación", "Subdelegación de Mediación y Calidad Académica", "Subdelegación de Estrategia y Desarrollo Tecnológico", "Subdelegación de Eventos", "Subdelegación de Bienestar e Igualdad Social"]);
const subdelegationsList = ref<SubdelegationsInfo[]>([
  { name: "Subdelegación de Ayuda y Servicios Para el Estudiante", internalName: "ayuda_servicios" },
  { name: "Subdelegación de Comunicación", internalName: "comunicacion" },
  { name: "Subdelegación de Mediación y Calidad Académica", internalName: "mediacion_calidad" },
  { name: "Subdelegación de Estrategia y Desarrollo Tecnológico", internalName: "TIC" },
  { name: "Subdelegación de Eventos", internalName: "eventos" },
  { name: "Subdelegación de Bienestar e Igualdad Social", internalName: "bienestar_igualdad" }
]);

//Variables for the new subdelegation
const newName = ref('');
const newInnerName = ref('');

//Variable storing the amount of forms that need attention
const unsolvedPetitions = ref<number | null>(null);

//Handle the alert showing
const showAlert = (type:'success' | 'error' | 'info', message:string) => {
  alertType.value = type;
  alertMessage.value = message;
  displayAlert.value = true;
}

const reviewFormsButtonClicked = () => {
  location.href = '/Home/review';
}

const fetchUnresolvedForms = async () => {
  const result = await petitionMaker.makePetition("/api/UnresolvedFormsCount", "GET");

  console.log(result);

  if(result.status == 200) {
    unsolvedPetitions.value = result.data.count;
  }
}

//Fetch all the forms that aren't resolved
onMounted(async () => {
  await fetchUnresolvedForms();
});

</script>

<template>
  <BasePage>
    <!-- Alert for user feedback -->
    <BaseAlert
      :show="displayAlert"
      :type="alertType"
      :message="alertMessage"

      @close="displayAlert = false" 
    />

    <!-- Header panel, just for welcome -->
    <BaseCard custom-class="BasePanel" top>
      <p class="HeaderText"> Panel de administración </p>
      <p class="SubtitleText"> Bienvenido de nuevo, USER </p>
    </BaseCard> 

    <!-- Redirecting to form reviewing -->
    <BaseCard custom-class="BasePanel">
        <p class="SecondHeaderText"><b> Revisar formularios </b></p>
        <p class="SubtitleText"> Hay {{ unsolvedPetitions }} formularios que requieren tu atención </p>
        <BaseButton  
          custom-class="BaseButton"
          @click="reviewFormsButtonClicked"
          variant="primary">
        Revisar los formularios
      </BaseButton>
    </BaseCard>

    <!-- Redirecting to form reviewing -->
    <BaseCard custom-class="BasePanel SubdelegationsCard" bottom>
      <p class="SecondHeaderText"> <b> Subdelegaciones </b> </p>
      <div class="SubdelegationsContainer" :class="{ editing: EditingSubdelegation }">
        <!-- Departments listing -->
        <div class="BasePanel SubdelegationsList">
          <p class="SubtitleText"> Subdelegaciones disponibles actualmente </p>
          <BaseDepartmentWrapper
            v-for="(info, index) in subdelegationsList"
            :key="index"
            :name="info.name"
            :inner-name="info.internalName"
            custom-class="DepartmentWrapper"
            :show-buttons="EditingSubdelegation"
          />

          <BaseButton
            v-if="EditingSubdelegation"
            custom-class="BaseButton"
            @click="EditingSubdelegation = false"
            variant="primary">
            Volver
          </BaseButton>
        </div>
      
        <!-- Manage / Operations panel -->
        <div class="BasePanel ManageSubdelegationsPanel">
          <form class="NewSubdelegationForm">
            <p class="SubtitleText"> Añadir una nueva subdelegación </p>
            <BaseInput
              v-model="newName"
              name="Description"
              placeholder="Nombre de la subdelegación"
              custom-class="Subject"
            />
            <BaseInput
              v-model="newInnerName"
              name="Description"
              placeholder="Nombre interno de la subdelegación"
              custom-class="Subject"
            />
            <BaseButton
              custom-class="BaseButton"
              variant="primary"
              type="submit">
              Crear subdelegación
            </BaseButton>
          </form>
        
          <BaseButton
            custom-class="BaseButton"
            @click="EditingSubdelegation = true"
            variant="primary">
            Gestionar subdelegaciones
          </BaseButton>

          <BaseButton
            custom-class="BaseButton"
            variant="danger">
            Limpiar subdelegaciones
          </BaseButton>
        </div>
      </div>
    </BaseCard>
  </BasePage>
</template>

<style scoped> 
/* #region Basic blocks */
.BasePanel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.BaseButton {
  max-width: 50%;

  @media(orientation: portrait) {
    max-width: 100%;
    width: 100%;
  }
}

.HeaderText {
  font-family: 'Montserrat', sans-serif;
  font-size: xx-large;
  font-weight: 700;
  text-align: center;

  margin-top: 5px;
  margin-bottom: 0px;
}

.SecondHeaderText {
  font-family: 'Montserrat', sans-serif;
  font-size: x-large;
  text-align: center;

  margin-top: 0px;
  margin-bottom: 0px;
}

.SubtitleText {
  font-family: 'Montserrat', sans-serif;
  font-size: large;
  text-align: center;

  margin-top: 0px;
  margin-bottom: 5px;
}

/* #endregion */

/* #region Subdelegations */
.SubdelegationsCard {
  overflow: hidden;
}

.SubdelegationsContainer {
  display: flex;
  width: 100%;
  overflow: hidden;
  flex-direction: row;

  @media(orientation: portrait) {
    flex-direction: column;
  }
}

.NewSubdelegationForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
}

/* LEFT PANEL */
.SubdelegationsList {
  flex: 0 0 50%;
  transition: flex-basis 0.4s ease;
}

/* RIGHT PANEL */
.ManageSubdelegationsPanel {
  gap: 10px;

  flex: 0 0 50%;
  max-height: 100%;
  transition: 
    transform 0.4s ease, 
    opacity 0.4s ease;
    max-height: 0.4s ease;
}

/* EDITING STATE */
.SubdelegationsContainer.editing .SubdelegationsList {
  flex-basis: 100%;
}

.SubdelegationsContainer.editing .ManageSubdelegationsPanel {
  transform: translateX(100%);
  opacity: 0;
  max-height: 0;
  pointer-events: none;
}

/* #endregion */
</style>