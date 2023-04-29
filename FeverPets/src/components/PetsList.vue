<script>
import { mapMutations } from 'vuex'
import { SET_PET_SORTING } from '../store/mutations.js'
import ApiPets from '../services/api-pets.js'
import ElementSorter from './ElementSorter.vue'
import PetTile from './PetTile.vue'

const MOCK_LOADING_TIME = 0

export default {
  components: {
    ElementSorter,
    PetTile
  },
  data() {
    return {
      pets: null,
      currentPetListSorting: null,
      paramsToSortBy: ['weight', 'length', 'height', 'name', 'kind']
    }
  },
  mounted() {
    const { currentPetListSorting } = this.$store.state
    if (currentPetListSorting) {
      this.currentPetListSorting = currentPetListSorting
      this.changeSorting(currentPetListSorting)
    } else {
      ApiPets.getAllPets().then(response => {
        setTimeout(() => { this.pets = response.data }, MOCK_LOADING_TIME)
      })
    }
  },
  methods: {
    ...mapMutations({
      setPetSorting: SET_PET_SORTING
    }),
    changeSorting({ sortBy, order }) {
      this.setPetSorting({ sortBy, order })
      ApiPets.getPetsSortedBy(sortBy, order).then(response => {
        setTimeout(() => { this.pets = response.data }, MOCK_LOADING_TIME)
      })
    },
    navigateToPetPage(id) {
      this.$router.push({name: 'pet', params: { id }})
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
      :defaultSorting="currentPetListSorting"
      @changeSorting="changeSorting"
    />
    <div v-if="pets" class="pet-carousel">
     <div 
        class="pet-tile-container"
        v-for="pet in pets"
        :key="pet.id"
      >
        <PetTile 
          :pet-data="pet"
          @click="navigateToPetPage(pet.id)"
        />
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