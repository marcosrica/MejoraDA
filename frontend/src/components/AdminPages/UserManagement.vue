<script setup lang="ts">
// #region Imports
    import { onMounted, ref } from 'vue'
    import PetitionMaker from '../../Utilities/PetitionMaker'
    import BaseAlert from '../BaseComponents/BaseAlert.vue';
    import BasePage from '../BuildingBlocks/BasePage.vue';
    import BaseCard from '../BaseComponents/BaseCard.vue';
    import type UserData from '../../interfaces/AllowedUserData';
    import BaseButton from '../BaseComponents/BaseButton.vue';
    import BaseInput from '../BaseComponents/BaseInput.vue';
// #endregion Imports

// #region variables
    //Handles authentication
    const showContent = ref(false);

    //Object needed to fulfill the petition
    const petitionMaker:PetitionMaker = new PetitionMaker();

    //Variables for the alert
    const showAlert = ref(false);
    const alertMessage = ref('');
    const alertType = ref<'success' | 'error' | 'info'>('success');

    //Variables for the add user form
    const username = ref('');

    //Data for the user list
    const users = ref<Array<UserData>>([]);

//#endregion variables

// #region Methods
    //Translates the permission data from the database structure to a spanish human readable format
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

    //Gets the allowed users for managing
    const getUsers = async () => {
        const response = await petitionMaker.makePetition('/api/users/info', 'GET');
        if(response.status == 200) {
            users.value = response.data;
        }
    }
// #endregion Methods


// #region OnMount

onMounted(async () => {
    const response = await petitionMaker.makePetition('/api/auth/amIAdmin', 'GET');

    showContent.value = response.status == 200;
    if(showContent.value) {
        await getUsers();
    }
});

// #endregion OnMount
</script>

<template>
    <BasePage :show-content="showContent">
        <BaseAlert
            :show="showAlert"
            :type="alertType"
            :message="alertMessage"

            @close="showAlert = false"
        />


        <!-- Manage current users -->
        <!-- Header of section -->
        <BaseCard custom-class="Header" top>
            <h1 class="HeaderText">Administración de usuarios existentes</h1>
        </BaseCard>
        <!-- Panel with allowed users -->
        <div class="Grid">
            <BaseCard
            custom-class="Card"
            v-for="(card) in users">
                <div class="UserCard">
                    <h2 class="marginlessText">{{ card.name }} {{ card.surname }}</h2>
                    <p class="marginlessText">Permiso: {{ getPermissionTranslation(card.permission) }}</p>
                </div>
                <div class="CardButtons">
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
                </div>
            </BaseCard>
        </div>
        <!-- End of section with the current user status -->
        <BaseCard custom-class="CurrentUser" bottom>
            <h1 class="HeaderText">Usuario existente</h1>
            <BaseButton
            variant="danger"
            v-on:click="">
            Dejar de ser administrador
        </BaseButton>
        </BaseCard>


        <!-- Add new user to the group -->
        <!-- Header of section -->
        <BaseCard custom-class="Header" top>
            <h1 class="HeaderText"> Añadir un nuevo usuario </h1>
        </BaseCard>
        <!-- Add user form -->
        <BaseCard custom-class="AddUserFormWrapper" bottom>
            <form class="AddUserForm">
                <div class="UsernameToAdd">
                    <p class="formMarginless"> Introduzca el nombre del usuario que desee añadir </p>
                    <BaseInput
                          v-model="username"
                          name="Description"
                          placeholder="Nombre de usuario"
                          custom-class="Subject"
                        />
                </div>

                <BaseButton 
                    type="submit" 
                    variant="primary">
                    Añadir usuario
                </BaseButton>
            </form>
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

    .CardButtons {
        box-sizing: border-box;
        width: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        gap: 5px;
    }

    .DeleteButton {
        width: 80%;
    }

    .CurrentUser {
        margin-top: 10px;
        margin-bottom: 2rem;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    /* #endregion */

    /* #region Add new users */
    .AddUserFormWrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .AddUserForm {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 60%;
    }

    .UsernameToAdd {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;

        border-bottom:  1px solid grey;

        padding-bottom: 10px;
        margin-bottom: 10px;
    }

    .formMarginless {
        margin-top: 2px;
        margin-bottom: 2px;
    }
    /* #endregion */
</style>