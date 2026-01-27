<script setup lang="ts">
    import { ref } from 'vue'
    import PetitionMaker from '../../Utilities/PetitionMaker'
    import BaseAlert from '../BaseComponents/BaseAlert.vue'; //For showing when the form has been submitted successfully
    import BasePage from '../BuildingBlocks/BasePage.vue';
    import BaseCard from '../BaseComponents/BaseCard.vue';
import type UserData from '../../interfaces/AllowedUserData';
import BaseButton from '../BaseComponents/BaseButton.vue';

    //Object needed to fulfill the petition
    const petitionMaker:PetitionMaker = new PetitionMaker();

    //Handles authentication
    const showContent = ref(true); //TODO: Temporary value for testing

    //Variables for the alert
    const showAlert = ref(false);
    const alertMessage = ref('');
    const alertType = ref<'success' | 'error' | 'info'>('success');

    //Data for the user list
    const users = ref<Array<UserData>>([
        {"name": "Juan", "surname": "Pérez", "permission": "admin"},
        {"name": "María", "surname": "García", "permission": "overseer"},
        {"name": "Luis", "surname": "López", "permission": "overseer"},
        {"name": "Ana", "surname": "Martínez", "permission": "admin"},
        {"name": "Carlos", "surname": "Rodríguez", "permission": "overseer"},
        {"name": "Elena", "surname": "Sánchez", "permission": "overseer"},
        {"name": "Miguel", "surname": "Fernández", "permission": "overseer"},
        {"name": "Laura", "surname": "Gómez", "permission": "admin"}
    ]);

    const getPermissionTranslation = (permission:String) => {
        if(permission == "overseer") {
            return "gestor"
        }   
        else if(permission == "admin") {
            return "administrador"
        }
        else {
            return "";
        }
    }
</script>

<template>
    <BasePage v-if="showContent">
        <BaseAlert
            :show="showAlert"
            :type="alertType"
            :message="alertMessage"

            @close="showAlert = false"
        />

        <BaseCard custom-class="Header" top>
            <h1 class="HeaderText">Administración de usuarios existentes</h1>
        </BaseCard>

        <div class="Grid">
            <BaseCard
            custom-class="Card"
            v-for="(card, index) in users">
                <div class="UserCard">
                    <h2 class="marginlessText">{{ card.name }} {{ card.surname }}</h2>
                    <p class="marginlessText">Permiso: {{ getPermissionTranslation(card.permission) }}</p>
                </div>
                <BaseButton
                    v-if="card.permission != 'admin'"
                    custom-class="DeleteButton"
                    variant="primary"
                    @click=""
                >
                    Fijar como administrador
                </BaseButton>
                <BaseButton
                    v-if="card.permission != 'admin'"
                    custom-class="DeleteButton"
                    variant="danger"
                    @click=""
                >
                    Eliminar usuario
                </BaseButton>
            </BaseCard>
        </div>

        <BaseCard custom-class="CurrentUser" bottom>
            <h1 class="HeaderText">Usuario existente</h1>
            <BaseButton
            variant="danger"
            v-on:click="">
            Dejar de ser administrador
        </BaseButton>
        </BaseCard>
    </BasePage>

    <div v-if="!showContent">
        <h1> 401 Acceso denegado </h1>
    </div>
</template>

<style scoped>
    .marginlessText {
        margin: 0;
    }

    /* #region Header */

    .Header {
        margin-bottom: 10px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .HeaderText {
        margin: 0;
    }

    /* #endregion */

    /* #region Grid */
    .Grid {
        width: 100%;

        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 10px;
    }

    .Card {
        padding: 1rem;
        margin-bottom: 0px;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .Card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
    }

    .CurrentUser {
        margin-top: 10px;
        margin-bottom: 1rem;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    /* #endregion */
</style>