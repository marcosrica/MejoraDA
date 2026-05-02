<script lang="ts" setup>
import { onMounted } from 'vue';
import PetitionMaker from '../../Utilities/PetitionMaker';



onMounted(async () => {
    const response = await new PetitionMaker().makeGetPetition("/api/auth/adminlogout");

    if(response.status == 200) {
        location.href = "/admin";
    }
})
</script>

<template>

</template>

<style scoped>

</style>