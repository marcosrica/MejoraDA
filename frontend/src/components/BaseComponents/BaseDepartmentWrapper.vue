<script setup lang="ts">
import BaseButton from './BaseButton.vue';
import BaseCard from './BaseCard.vue';

defineProps<{
  customClass?: string
  name: string
  innerName: string
  showButtons: boolean
}>();

const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'delete'): void
}>();

</script>

<template>
    <div class="ContainerParent">
        <div class="Buttons_Container">
            <base-button v-if="showButtons" variant="danger" @click="emit('delete')">
                Borrar
            </base-button>
            <base-button v-if="showButtons" variant="primary" @click="emit('edit')">
                Editar
            </base-button>
        </div>
        <BaseCard custom-class="NoPadding"
        :class="{ editing: showButtons }">
            <p class="DepartmentNameText">{{ name }}</p>
            <p class="DepartmentNameText" v-if="showButtons">[{{ innerName }}]</p>
        </BaseCard>
        
        
    </div>
</template>

<style scoped>
.ContainerParent {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    margin-bottom: 10px;
}

.Buttons_Container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 5px;

    @media(orientation: portrait) {
        flex-direction: column;
    }
}

.NoPadding {
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 2px;
    padding-bottom: 2px;

    width: 80%;
}

.NoPadding.editing {
    width: 60%;
}


.DepartmentNameText {
    font-family: 'Montserrat', sans-serif;
    font-size: large;
    text-align: justify;
    
    margin: 0px;
}
</style>
