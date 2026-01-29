<script lang="ts" setup>
import { ref } from 'vue';
import { onMounted } from 'vue';

import BaseAlert from '../BaseComponents/BaseAlert.vue'; 
import PetitionMaker from '../../Utilities/PetitionMaker'
import BaseButton from '../BaseComponents/BaseButton.vue'; 
import BaseSelect from '../BaseComponents/BaseSelect.vue';
import BaseCheckbox from '../BaseComponents/BaseCheckbox.vue';
import BaseCard from '../BaseComponents/BaseCard.vue';
import BasePage from '../BuildingBlocks/BasePage.vue';
//Class that holds the method to make petitions to the backend
const petitionMaker:PetitionMaker = new PetitionMaker();

//Variables for the alert
const displayAlert = ref(false);
const alertMessage = ref('');
const alertType = ref<'success' | 'error' | 'info'>('success');

//Fields that are completed in the filters form, and accedes in the handleSubmit function
const department = ref('All');
const type = ref('All');
const showResolved = ref(false);

//Group of last applied filters for whenever reloading is needed
let lastDept:string;
let lastType:string;
let lastRes:boolean;

//Variable containing the forms retrieved from the backend
const petitions = ref<any[]>([]);
const unsolvedPetitions = ref<number>(0);

//Handle the alert showing
const showAlert = (type:'success' | 'error' | 'info', message:string) => {
  alertType.value = type;
  alertMessage.value = message;
  displayAlert.value = true;
}

//Request the forms that comply with the new filters
const handleSubmit = async () => {
  const filters = {
    department: department.value,
    type: type.value,
    showResolved: showResolved.value,
  };

  console.log(filters);

  await fetchForms(filters.department, filters.type, filters.showResolved);
}

//Mark a certain form as resolved after analisis
const markAsResolved = async (type:string, petitionId:number) => {
  const data = {
    type: type,
    id: petitionId,
  };

  const response = await petitionMaker.makePetition("/api/petitions/markAsResolved", "POST", data);
  console.log(response);

  if(response.status == 200) {
    showAlert("success", "La solicitud ha sido marcada como resuelta");
    fetchForms(lastDept, lastType, lastRes);
  }
  else {
    showAlert("error", "Ha habido un error al marcar la solicitud como resuelta");
  }
}

//Retrieve the forms answers from the server with the applied filters
const fetchForms = async (department:string, type:string, showResolved:boolean) => {
  const data = {
    department: department,
    type: type,
    showResolved: showResolved,
  };

  const response = await petitionMaker.makePetition('/api/petitions/filter', 'POST', data);
  if(!response.error) {
    petitions.value = []
    petitions.value = response.data.map(p => ({ ...p, expanded: false }));

    lastDept = data.department;
    lastType = data.type;
    lastRes = data.showResolved;
  }
  else {
    showAlert("error", "Ha ocurrido un error al aplicar los filtros");
  }
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
  fetchForms(department.value, type.value, showResolved.value);
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

    <!-- Header -->
    <BaseCard customClass="Home_Welcome" top>
      <h2 class="Home_Welcome_Text">¡Bienvenido de nuevo, USER!</h2>
      <p class="Home_UnsolvedPetitionsCount"> Hay {{ unsolvedPetitions }} solicitudes pendientes </p>
    </BaseCard>

    <!-- Filters Section -->
    <BaseCard customClass="Home_Filters" >
      <p class="Home_Big_Text"> Filtrar solicitudes </p>
      <form class="Filters_Form"  @submit.prevent="handleSubmit">
        <div class="Home_Department">
          <label for="status">Subdelegación:</label>
          <BaseSelect
            v-model="department"
            custom-class="Home_StatusSelection"
            label=""
            placeholder="Selecciona una opción"
            :options="[
              { value: 'All', label: 'Todas' },
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
        <div class="Home_Type">
          <label for="status" >Tipo:</label>
          <BaseSelect
            v-model="type"
            label=""
            placeholder="Selecciona una opción"
            :options="[
              { value: 'All', label: 'Todos' },
              { value: 'Complaint', label: 'Quejas' },
              { value: 'Idea', label: 'Ideas' },
              { value: 'Suggestion', label: 'Sugerencia' },
            ]"
          />
        </div>
        <div class="Home_OnlyPending">
          <label for="status">Mostrar también las incidencias resueltas</label>
          <BaseCheckbox
            v-model="showResolved"
            name="onlyPending"
            customClass="Home_OnlyPendingCheckbox"
          />
        </div>
        <div class="Home_Submit">
          <BaseButton type="submit" variant="primary"> Aplicar filtros </BaseButton>
        </div>
      </form>
    </BaseCard>

    <!-- Retrieved Forms Section -->
    <BaseCard custom-class="Home_Forms" bottom>
      <div class="Home_Forms_ExpandableHeader">
        <p class="Home_Big_Text"> Se han encontrado {{ petitions.length }} solicitudes </p>
      </div>

      <div class="Home_PetitionsList" >
        <BaseCard
          v-for="petition in petitions"
          :key="petition.public_id || petition.request_id"
          border-color="rgb(146, 146, 146)"
          class="PetitionCard"
          top
          bottom
        >
          <!-- Header: Subject -->
          <div 
            class="PetitionHeader"
            @click="petition.expanded = !petition.expanded"
          >
            <h3 class="PetitionSubject">{{ petition.subject }}</h3>
            <span class="ToggleIndicator">
              {{ petition.expanded ? '▲' : '▼' }}
            </span>
          </div>
            
          <!-- Subtitle: type, department, status -->
          <div class="PetitionSubtitle">
            <p class="Cards_SubtitleText"><strong>Tipo:</strong> {{ petition.type }}</p>
            <p><strong>Dirigido a:</strong> {{ petition.department }}</p>
            <p>
              <strong>Estado:</strong> {{ petition.solved ? 'Resuelta' : 'Pendiente' }}
            </p>
          </div>
            
          <!-- Expandable description -->
          <transition name="collapse">
            <div 
              class="PetitionDescription"
              v-if="petition.expanded"
            >
              <p class="DescriptionHeader"> <strong> Descripción:  </strong> </p>
              <p>{{ petition.description }}</p>
            </div>
          </transition>
          <div class="ResolvePetitionDiv" v-if="!petition.solved">
            <BaseButton variant="primary" v-on:click="markAsResolved(petition.type, petition.request_id)"> Marcar como resuelta </BaseButton>
            <BaseButton variant="danger" v-on:click="markAsResolved(petition.type, petition.request_id)"> Eliminar solicitud </BaseButton>
          </div>
        </BaseCard>
      </div>
    </BaseCard>
  </BasePage>
</template>

<style scoped> 
.Home_Big_Text {
  font-family: 'Montserrat', sans-serif;
  font-size: large;
  font-weight: bold;
}

/* Welcome div */
.Home_Welcome {
  box-sizing: border-box;

  color: black;
  text-align: center;
  padding: 20px;
}

.Home_Welcome_Text {
  font-family: 'Montserrat', sans-serif;
  font-size: large;
  font-weight: bold;
  margin-bottom: 0px;
}

.Home_UnsolvedPetitionsCount {
  margin-top: 5px;
}

/* Filters div */
.Home_Filters {
  box-sizing: border-box;

  color: black;
  text-align: center;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
}

.Filters_Form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 80%;
  gap: 5px
}

.Home_Department {
  width: 80%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  margin-bottom: 10px;
}

.Home_Type {
  width: 80%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  margin-bottom: 10px;
}

.Home_StatusSelection {
  width: 50%;
  margin-left: 5px;
  gap: 10px;
}

.Home_OnlyPending {
  width: 80%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 10px;
}

/* Filtered forms */
.Home_Forms_ExpandableHeader{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  cursor: pointer;
}

.Home_Forms {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-bottom: 20px;
}

.Home_PetitionsList {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media (orientation: portrait) {
  .PetitionCard {
    flex-direction: column;
  }
}
@media (orientation: landscape) {
  .PetitionCard {
    flex-direction: row;
  }
}

.PetitionCard {
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin-bottom: 15px;
  width: 90%;
  box-sizing: border-box;
}

.PetitionHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.PetitionSubject {
  font-size: 1.2em;
  font-weight: bold;
  margin: 0px;
}

.ToggleIndicator {
  font-size: 1em;
}

.PetitionSubtitle {
  font-size: 0.9em;
  color: var(--text-secondary);
  margin-top: 5px;
  margin-bottom: 0px;
}

.PetitionDescription {
  margin-top: 0px;
  font-size: 0.95em;
  color: var(--text-primary);
}

.DescriptionHeader {
  margin-top: 0px;
}

.Cards_SubtitleText {
  margin-top: 0px;
  margin-bottom: 2px;
}

/* Description transition */
.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

.collapse-enter-to,
.collapse-leave-from {
  max-height: 500px; /* max expected height of description */
  opacity: 1;
}

.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.3s ease;
}

.ResolvePetitionDiv {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (orientation: portrait) and (max-width: 500px) {
    flex-direction: column;
    gap: 10px;
  }
}

</style>