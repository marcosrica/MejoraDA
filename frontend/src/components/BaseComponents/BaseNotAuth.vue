<script setup lang="ts">
import BaseCard from './BaseCard.vue';


</script>

<template>
    <BaseCard top bottom>
        <h1 class="text"> ¡Uy, no deberías estar aquí! </h1>
        <p class="text SecondaryText"> Parece que no tienes permiso para acceder a este contenido </p>
        <p class="text SecondaryText"> Si aún así consideras que deberías tener acceso, ponte en contacto con la delegación </p>
        <h1 class="text Emoji"> 😔 </h1>
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
</style>
