<script setup lang="ts">
import BaseCard from './BaseCard.vue';
import PetitionMaker from '../../Utilities/PetitionMaker';
import { onMounted, ref } from 'vue';

const petititonMaker = new PetitionMaker();
let reject = ref<String>("");

onMounted(async () => {
    //const response = await petititonMaker.makeRootPetition("https://naas.isalman.dev/no", 'GET', null);
    //reject.value = response.data.reason;
});

</script>

<template>
    <BaseCard top bottom>
        <h1 class="text"> ¡Uy, no deberías estar aquí! </h1>
        <p class="text SecondaryText"> Parece que no tienes permiso para acceder a este contenido </p>
        <p class="text SecondaryText"> Si aún así consideras que deberías tener acceso, ponte en contacto con la delegación </p>
        <h1 class="text Emoji"> 😔 </h1>
        <p class="rejectText"> {{ reject }} </p>
    </BaseCard>
</template>

<style scoped>
.text {
    text-align: center;    
    margin: 0px;
}

.SecondaryText {
    margin-bottom: 5px;

    font-size: 20px;
}

.Emoji {
    font-size: 7rem;
    margin: 0;
}

.rejectText {
    text-align: center;
    font-style: italic;
}
</style>
