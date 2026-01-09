<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import PetitionMaker from '../Utilities/PetitionMaker'
    import BaseCard from './BaseComponents/BaseCard.vue'
    import BaseButton from './BaseComponents/BaseButton.vue'
    import BasePage from './BuildingBlocks/BasePage.vue';

    const totalForms = ref<number | null>(null);
    const totalIdeas = ref<number | null>(null);
    const totalComplaints = ref<number | null>(null);
    const totalSuggestions = ref<number | null>(null);

    onMounted(async () => {
      const pm = new PetitionMaker();
      const totalFormsResult = await pm.makePetition('/api/index/getTotalForms', 'GET');
      const brokenDownResult = await pm.makePetition('/api/index/getFormsBreakdown', 'GET');

      if (!totalFormsResult.error && totalFormsResult.data?.count !== undefined) {
        totalForms.value = totalFormsResult.data.count;
      }

      if(!brokenDownResult.error && brokenDownResult.data) {
        totalIdeas.value = brokenDownResult.data.ideas;
        totalComplaints.value = brokenDownResult.data.complaints;
        totalSuggestions.value = brokenDownResult.data.suggestions;
      }
    })

    const fillFormButtonClicked = () => {
      location.href = '/Form';
    }

    const reviewFormsButtonClicked = () => {
      location.href = '/Home/review';
    }
    /**
   .ToFormButton {
      background-color: var(--main-color);
      color: black;
      font-family: 'Montserrat', sans-serif;
      font-size: large;
      font-weight: 700;
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      cursor: pointer;
    }

    .ToFormText {
      font-family: 'Montserrat', sans-serif;
      font-size: x-large;
      margin-bottom: 10px;
    }

    .DescriptionText {
      font-family: 'Montserrat', sans-serif;
      font-size: large;
      text-align: center;
      max-width: 90%;
    }
    
    .PrinciplesList {
      font-family: 'Montserrat', sans-serif;
      font-size: large;
      list-style: disc;
      padding-left: 20px;
    }
    
    .UsageText {
      font-family: 'Montserrat', sans-serif;
      font-size: x-large;
    }
   */
</script>

<template>
  <BasePage>
    <!-- Intro -->
    <BaseCard custom-class="BaseContainer">
        <p class="HeaderText"><b>MejoraDA, un medio para la superación de todos</b></p>
        <p class="DescriptionText">
          Desde la delegación de alumnos de la ETSISI, estamos siempre atentos a todas 
        </p>
    </BaseCard>

    <!-- Usage -->
    <BaseCard custom-class="BaseContainer UsageCardContainer">
      <p class="HeaderText">
        <b> El programa en cifras: </b>
      </p>

      <BaseCard custom-class="TotalFiles"
        background-color="var(--okColorBackground)"
        border-color="var(--okColor)">
          <p class="Index_Numbers"> {{totalForms}} </p>
          <p class="UsageText_DataIdentifier"> Formularios totales </p>
      </BaseCard>

      <div class="SubdivisionByType">
        <BaseCard custom-class="SubdividedForms"
          background-color="var(--okColorBackground)"
          border-color="var(--okColor)">
            <p class="Index_Numbers"> {{totalIdeas}} </p>
            <p class="UsageText_DataIdentifier"> Ideas </p>
        </BaseCard>
        <BaseCard custom-class="SubdividedForms"
          background-color="var(--notOkColorBackground)"
          border-color="var(--notOkColor)">
            <p class="Index_Numbers"> {{totalComplaints}} </p>
            <p class="UsageText_DataIdentifier"> Quejas </p>
        </BaseCard>
        <BaseCard custom-class="SubdividedForms"
          background-color="var(--okColorBackground)"
          border-color="var(--okColor)">
            <p class="Index_Numbers"> {{totalSuggestions}} </p>
            <p class="UsageText_DataIdentifier"> Sugerencias </p>
        </BaseCard>
      </div>
    </BaseCard>

    <!-- Create a form -->
    <BaseCard custom-class="BaseContainer">
      <p class="HelpHeader"><b>¿Tienes algo que contarnos?</b></p>
      <p class="DescriptionText"><b>No dudes en rellenar una nueva solicitud, ¡es totalmente anónima! Tardarás menos de cinco minutos en hacerla, y nos será muy útil para mejorar la experiencia en la ETSISI.</b></p>
      <BaseButton  
       @click="fillFormButtonClicked"
       variant="primary"
       custom-class="FillFormButton">
        Rellenar el formulario
      </BaseButton>
    </BaseCard>

    <!-- Admin panel -->
    <BaseCard custom-class="BaseContainer">
      <p class="ToFormText"><b>Panel para los administradores</b></p>
      <BaseButton  
       @click="reviewFormsButtonClicked"
       variant="primary"
       custom-class="FillFormButton">
        Revisar los formularios
      </BaseButton>
    </BaseCard>
  </BasePage>
</template>

<style scoped>
  .BaseContainer {
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-bottom: 10px;
    box-sizing: border-box;
    width: 100%;
  }

  .HeaderText {
    font-family: 'Montserrat', sans-serif;
    font-size: x-large;
    text-align: center;
    margin-bottom: 10px;
  }

  .UsageCardContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .FillFormButton {
    width: 20%;
  }

  .Index_Numbers {
    font-size: 150px;
    font-weight: 700;

    margin-top: 0px;
    margin-bottom: 0px;
  }

  .UsageText_DataIdentifier {
    margin-top: 0px;
    margin-bottom: 0px;

    align-self: center;
  }

  .TotalFiles {
    width: 40%;

    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 10px;

    @media(orientation: portrait) {
      width: 90%;
    }
  }

  .SubdivisionByType {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    margin-top: 20px;
    gap: 20px;

    @media(orientation: portrait) {
      flex-direction: column;
      gap: 10px;
    }
  }

  .SubdividedForms {
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media(orientation: portrait) {
      width: 80%;
    }
  }

  .HelpHeader {
    font-family: 'Montserrat', sans-serif;
    font-size: xx-large;
    text-align: center;
    margin-bottom: 5px;
    margin-top: 0px;
  }

  .DescriptionText {
    font-family: 'Montserrat', sans-serif;
    font-size: large;
    text-align: justify;
    max-width: 90%;

    margin-top: 5px;
    margin-bottom: 7px;
  }
</style>
