<script>
import ApiPets from '../services/api-pets.js'
import PetTile from './PetTile.vue'

const MOCK_LOADING_TIME = 1000

export default {
  components: {
    PetTile
  },
  data() {
    return {
      pets: null
    }
  },
  mounted() {
    ApiPets.getAllPets().then(response => {
      setTimeout( () => { this.pets = response.data }, MOCK_LOADING_TIME)
    })
  }
}
</script>

<template>
  <div class="pet-list">
    <div v-if="pets" class="pet-carousel">
     <div 
        class="pet-tile-container"
        v-for="pet in pets"
        :key="pet.id"
      >
        <PetTile :pet-data="pet" />
      </div>
    </div>
    <div v-else>Loading pets!</div>
  </div>
</template>

<style scoped lang="scss">
.pet-carousel {
  display: flex;
  flex-flow: row wrap;

  .pet-tile-container {
    margin: 0px 16px 16px 0px;
  }
}
</style>