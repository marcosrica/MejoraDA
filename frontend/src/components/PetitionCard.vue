<script setup lang="ts">
import BaseCard from './BaseCard.vue';
import type Petition from '../interfaces/Petition';

defineProps<{
  petition: Petition
}>();

</script>

<template>
  <BaseCard class="PetitionCard">
    <div class="PetitionHeader">
      <span class="TypeBadge" :class="petition.type">
        {{ petition.type }}
      </span>

      <span
        class="StatusBadge"
        :class="petition.resolved ? 'resolved' : 'pending'"
      >
        {{ petition.resolved ? 'Resuelta' : 'Pendiente' }}
      </span>
    </div>

    
    <h3 class="PetitionSubject">
      {{ petition.subject }}
    </h3>

    
    <p class="PetitionDepartment">
      <b>Subdelegación:</b> {{ petition.department }}
    </p>

    
    <p class="PetitionDescription">
      {{ petition.description }}
    </p>
  </BaseCard>
</template>

<style scoped>
.PetitionHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Type badge */
.TypeBadge {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: bold;
  text-transform: capitalize;
}

.TypeBadge.idea {
  background-color: #e0f2fe;
  color: #0369a1;
}

.TypeBadge.queja {
  background-color: #fee2e2;
  color: #991b1b;
}

.TypeBadge.sugerencia {
  background-color: #ecfeff;
  color: #0f766e;
}

/* Status badge */
.StatusBadge {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: bold;
}

.StatusBadge.pending {
  background-color: #fef3c7;
  color: #92400e;
}

.StatusBadge.resolved {
  background-color: #dcfce7;
  color: #166534;
}

.PetitionSubject {
  margin: 0;
  font-size: 16px;
}

.PetitionDepartment {
  font-size: 13px;
  color: #555;
}

.PetitionDescription {
  font-size: 14px;
  line-height: 1.4;
}
</style>
