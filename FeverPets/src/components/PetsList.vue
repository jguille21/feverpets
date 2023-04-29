<script>
import ApiPets from '../services/api-pets.js'

const MOCK_LOADING_TIME = 2000

export default {
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
    <div v-if="pets">
     {{ pets }}
    </div>
    <div v-else>Loading pets!</div>
  </div>
</template>

<style scoped lang="scss">
</style>