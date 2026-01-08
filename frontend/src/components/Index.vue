<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import PetitionMaker from '../Utilities/PetitionMaker'
import BaseCard from './BaseCard.vue'
import BaseButton from './BaseButton.vue'

    const unresolvedCount = ref<number | null>(null)

    onMounted(async () => {
      const pm = new PetitionMaker()
      const result = await pm.makePetition('/api/UnresolvedFormsCount', 'GET')

      if (!result.error && result.data?.count !== undefined) {
        unresolvedCount.value = result.data.count
      }
    })

    const fillFormButtonClicked = () => {
      location.href = '/Form'
    }

    const reviewFormsButtonClicked = () => {
      location.href = '/Home'
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
  <div class="Parent">
        <div class="TopBarDiv">
            <div class="PageID" onclick="location.href = '/'">
                <img src="./../assets/Logo.png" alt="MejoraDA Logo" class="ServiceLogo"/>
                <h1> MejoraDA </h1>
            </div>

            <img src="./../assets/Logo.png" alt="MejoraDA Logo" class="ServiceLogo"/>
        </div>

        <div class="ContentDiv">
            <!-- Intro -->
            <BaseCard custom-class="BaseContainer">
                <p class="ToFormText"><b>MejoraDA, un medio para la superación de todos</b></p>
                <p class="DescriptionText">
                    Pensad en la facultad: en todo lo bueno, en lo malo, en 
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
                  <p class="Index_Numbers"> 2048 </p>
                  <p class="UsageText_DataIdentifier"> Formularios totales </p>
                </BaseCard>
            </BaseCard>
         
           <!-- Create a form -->
           <BaseCard custom-class="BaseContainer">
             <p class="ToFormText"><b>Crear una solicitud</b></p>
             <BaseButton  
              @click="fillFormButtonClicked"
              variant="primary"
              custom-class="FillFormButton">
               Rellenar el formulario
             </BaseButton>
           </BaseCard>
         
           <BaseCard custom-class="BaseContainer">
             <p class="ToFormText"><b>Revisar los formularios</b></p>
             <BaseButton  
              @click="reviewFormsButtonClicked"
              variant="primary"
              custom-class="FillFormButton">
               Revisar los formularios
             </BaseButton>
           </BaseCard>
         
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
    justify-content: flex-end;
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
    cursor:pointer;
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
    height: 90%;

    /* Overall structure */
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: top;

    /* Margins and paddings */
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 5px;
    padding-right: 5px;
  }

  .BaseContainer {
    margin-bottom: 10px;
    box-sizing: border-box;
    width: 80%;
    
    @media(orientation: portrait) {
      width: 95%;
    }
  }

  .HeaderText {
    font-family: 'Montserrat', sans-serif;
    font-size: x-large;
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
</style>
