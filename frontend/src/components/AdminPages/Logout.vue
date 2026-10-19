<script lang="ts" setup>
import { onMounted } from 'vue';
import PetitionMaker from '../../Utilities/PetitionMaker';
import ServerRoutes from '../../../keys';

const serverRoutes: ServerRoutes = new ServerRoutes();

onMounted(async () => {
    const response = await new PetitionMaker().makeGetPetition("/api/auth/adminlogout");

    if(response.status == 200) {
        location.href = serverRoutes.base_url + "/admin";
    }
})
</script>

<template>

</template>

<style scoped>

</style>