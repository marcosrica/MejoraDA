<script lang="ts" setup>
import { ref } from 'vue'
import PetitionMaker from '../Utilities/PetitionMaker'

const petitionMaker:PetitionMaker = new PetitionMaker();

const department = ref('Todo')
const type = ref('Todo')
const showResolved = ref(false)

const handleSubmit = async () => {
  const filters = {
    department: department.value,
    type: type.value,
    showResolved: showResolved.value,
  }

  const response = await petitionMaker.makePetition('POST', '/api/petitions/filter', filters);

  console.log('Applied filters:', filters);
  console.log('Response:', response);
}
</script>

<template>
  <div class="Home_background">
    <div class="TopBarDiv">
      <div class="PageID" onclick="location.href = '/'">
        <img src="./../assets/Logo.png" alt="MejoraDA Logo" class="ServiceLogo"/>
        <h1> MejoraDA </h1>
      </div>

      <img src="./../assets/Logo.png" alt="MejoraDA Logo" class="ServiceLogo"/>
    </div>
    <div class="Home_content_wrapper">
      <div class="Home_content">
        <div class="Home_Welcome">
          <h2 class="Home_Big_Text">¡Bienvenido de nuevo, USER!</h2>
          <p> Hay x solicitudes pendientes </p>
        </div>
        <div class="Home_Filters">
          <p class="Home_Big_Text"> Filtrar solicitudes </p>
          <form class="Filters_Form"  @submit.prevent="handleSubmit">
            <div class="Home_Department">
              <label for="status">Subdelegación:</label>
              <select id="status" name="status" class="Home_StatusSelection" v-model="department">
                  <option value="Todo"> Todas </option>
                  <option value="General"> General </option>
                  <option value="AtencionEstudiante"> Subdelegación de Ayuda y Servicios para el Estudiante </option>
                  <option value="Comunicacion"> Subdelegación de Comunicación </option>
                  <option value="Calidad"> Subdelegación de Mediación y Calidad Académica </option>
                  <option value="TIC"> Subdelegación de Estrategia y Desarrollo Tecnológico </option>
                  <option value="Eventos"> Subdelegación de Eventos </option>
                  <option value="Igualdad"> Subdelegación de Bienestar e Igualdad Social </option>
              </select>
            </div>
            <div class="Home_Type">
              <label for="status" >Tipo:</label>
              <select id="status" name="status" class="Home_StatusSelection" v-model="type">
                  <option value="Todo"> Todos </option>
                  <option value="Complaint"> Quejas </option>
                  <option value="Idea"> Ideas </option>
                  <option value="Suggestion"> Sugerencia </option>
              </select>
            </div>
            <div class="Home_OnlyPending">
              <label for="status">Mostrar también las incidencias resueltas</label>
              <input type="checkbox" id="onlyPending" name="onlyPending" v-model="showResolved"/>
            </div>
            <div class="Home_Submit">
              <button type="submit"> Aplicar filtros </button>
            </div>
          </form>
        </div>
        <div class="Home_Forms">
          <p class="Home_Big_Text"> Se han encontrado x solicitudes </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped> 
/* Big Blocks */
.Home_background {
  height: 100dvh;
  width: 100dvw;

  display: flex;
  flex-direction: column-reverse;

  background-color: var(--background);
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

.Home_content_wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 90%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.Home_content {
  /* Width and height */
  box-sizing: border-box;
  overflow-y: auto;

  width:100%;
  max-height: 100%;

  /* Margins */
  padding-top: 20px;
  padding-bottom: 50px;
  padding-left: 5px;
  padding-right: 5px;
}

@media (max-width: 400px) {
  .Home_content {
    width: 95%;
  }
}
@media (max-width: 600px) {
  .Home_content {
    width: 90%;
  }
}
@media (max-width: 900px) {
  .Home_content {
    width: 80%;
  }
}
@media (min-width: 900px) {
  .Home_content {
    width: 70%;
  }
}

.Home_Big_Text {
  font-family: 'Montserrat', sans-serif;
  font-size: large;
  font-weight: bold;
}

/* Welcome div */
.Home_Welcome {
  box-sizing: border-box;
  background-color: var(--panel-background);
  border-radius: 10px;
  box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.921),
      0 2px 6px rgba(0, 0, 0, 0.284);

  width: 100%;
  color: black;
  text-align: center;
  padding: 20px;

  margin-bottom: 20px;
}

/* Filters div */
.Home_Filters {
  box-sizing: border-box;
  background-color: var(--panel-background);
  border-radius: 10px;
  box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.921),
      0 2px 6px rgba(0, 0, 0, 0.284);

  width: 100%;
  color: black;
  text-align: center;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  margin-bottom: 20px;
}

.Filters_Form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.Home_Department {
  width: 80%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 10px;
}

.Home_StatusSelection {
  width: 50%;
}

.Home_Type {
  width: 80%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 10px;
}

.Home_OnlyPending {
  width: 80%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 10px;
}

/* Filtered forms */
.Home_Forms {
  box-sizing: border-box;
  background-color: var(--panel-background);
  border-radius: 10px;
  box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.921),
      0 2px 6px rgba(0, 0, 0, 0.284);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-bottom: 20px;
}
</style>