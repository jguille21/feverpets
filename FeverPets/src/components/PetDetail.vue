<script>
import ApiPets from '../services/api-pets.js'
import PET_KINDS from '../constants/pet-kinds.js'
import { getPetHealthTier } from '../helpers/pet-health-calculator.js'

export default {
  data() {
    return {
      petData: null
    }
  },
  mounted() {
    const petId = this.$route.params.id
    ApiPets.getPetById(petId).then(response => {
      this.petData = response.data
    })
  },
  computed: {
    isCat() {
      return this.petData.kind === PET_KINDS.CAT
    },
    getPetPhoto() {
      const photoURL = this.petData['photo_url']
      const isValidUrl = photoURL.match(/^https?:\/\/.+\/.+.(jpeg|jpg|gif|png)$/)
      return (isValidUrl) ? photoURL : '../src/assets/images/no_image.jpg'
    },
    getPetName() {
      return this.petData.name
    },
    getPetDescription() {
      return this.petData.description
    },
    getPetKind() {
      return this.petData.kind
    },
    getPetWeight() {
      return `${this.petData.weight} grams`
    },
    getPetHeight() {
      return `${this.petData.height} centimeters`
    },
    getPetLength() {
      return `${this.petData.length} centimeters`
    },
    getPetRemainingLives() {
      return this.petData['number_of_lives']
    },
    getPetHealth() {
      return getPetHealthTier(this.petData)
    }
  }
}
</script>

<template>
  <div
    v-if="petData"
    class="pet-detail"
  >
  <p>Welcome to {{ petData.name }}'s page!</p>
  <div class="pet-data">
    <div>
      <img class="photo" :src="getPetPhoto" />
    </div>
    <div class="details">
      <span>Name: {{ getPetName }}</span>
      <span>Kind: {{ getPetKind }}</span>
      <span>Weight: {{ getPetWeight }}</span>
      <span>Height: {{ getPetHeight }}</span>
      <span>Length: {{ getPetLength }}</span>
      <span v-if="isCat">Remaining lives: {{ getPetRemainingLives }}</span>
      <span>Health: {{ getPetHealth }}</span>
      <span>Description:</span>
      <span>{{ getPetDescription }}</span>
    </div>
  </div>
  </div>
</template>

<style scoped lang="scss">
.pet-detail {
  p {
    text-align: center;
    margin: 32px 0px;
  }

  .pet-data {
    display: flex;
    justify-content: space-evenly;

    .photo {
      max-width: 500px;
    }

    .details span {
      display: block;
    }
  }
}
</style>
