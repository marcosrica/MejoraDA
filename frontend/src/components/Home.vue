<template>
    <div class="Home_background">
    <div class="Home_NavBar">
      <h1 class="Home_NavBar_Text">Portal MejoraDA</h1>
    </div>
    <div class="Home_content_wrapper">
      <div class="Home_content">
        <div class="Home_Welcome">
          <h2 class="Home_Big_Text">¡Bienvenido de nuevo, USER!</h2>
          <p> Hay x solicitudes pendientes </p>
        </div>
        <div class="Home_Filters">
          <p class="Home_Big_Text"> Filtrar solicitudes </p>
          <form>
            <label for="status">Subdelegación:</label>
            <select id="status" name="status">
                <option value="Todo"> Todas </option>
                <option value="General"> General </option>
                <option value="AtencionEstudiante"> Subdelegación de Ayuda y Servicios para el Estudiante </option>
                <option value="Comunicacion"> Subdelegación de Comunicación </option>
                <option value="Calidad"> Subdelegación de Mediación y Calidad Académica </option>
                <option value="TIC"> Subdelegación de Estrategia y Desarrollo Tecnológico </option>
                <option value="Eventos"> Subdelegación de Eventos </option>
                <option value="Igualdad"> Subdelegación de Bienestar e Igualdad Social </option>
            </select>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped> 
/* Big Blocks */
.Home_background {
  width: 100dvw;
  height: 100dvh;
  background-color: var(--background);

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.Home_NavBar {
  background-color: var(--main-color);
  color: black;
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

  padding-left: 10px;
  padding-right: 10px;
}

.Home_NavBar_Text {
  font-family: 'Anton', sans-serif;
  font-size: xx-large;
  font-weight: bold;
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
}
</style>