<script>
import ApiPets from '../services/api-pets.js'
import ElementSorter from './ElementSorter.vue'
import PetTile from './PetTile.vue'

const MOCK_LOADING_TIME = 1000

export default {
  components: {
    ElementSorter,
    PetTile
  },
  data() {
    return {
      pets: null,
      paramsToSortBy: ['weight', 'length', 'height', 'name', 'kind']
    }
  },
  mounted() {
    ApiPets.getAllPets().then(response => {
      setTimeout( () => { this.pets = response.data }, MOCK_LOADING_TIME)
    })
  },
  methods: {
    changeSorting({ sortBy, order }) {
      ApiPets.getPetsSortedBy(sortBy, order).then(response => {
        setTimeout( () => { this.pets = response.data }, MOCK_LOADING_TIME)
      })
    }
  }
}
</script>

<template>
  <div class="pet-list">
    <ElementSorter
      v-if="pets"
      title="Sort pets by:"
      :paramsToSortBy="paramsToSortBy"
      @changeSorting="changeSorting"
    />
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
.pet-sorter {
  margin: 16px;
}

.pet-carousel {
  display: flex;
  flex-flow: row wrap;

  .pet-tile-container {
    margin: 0px 16px 16px 0px;
  }
}
</style>