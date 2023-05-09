<script>
import ApiPets from 'services/api-pets.js'
import PET_KINDS from 'constants/pet-kinds.js'
import { getPetHealthTier } from 'helpers/pet-health-calculator.js'

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
      return this.$t(`pet.kinds.${this.petData.kind}`)
    },
    getPetWeight() {
      return `${this.petData.weight} ${this.$t('pet.measures.grams')}`
    },
    getPetHeight() {
      return `${this.petData.height} ${this.$t('pet.measures.centimeters')}`
    },
    getPetLength() {
      return `${this.petData.length} ${this.$t('pet.measures.centimeters')}`
    },
    getPetRemainingLives() {
      return this.petData['number_of_lives']
    },
    getPetHealth() {
      return this.$t(`pet.health.${getPetHealthTier(this.petData)}`)
    }
  }
}
</script>

<template>
  <div
    v-if="petData"
    class="pet-detail"
  >
  <p>{{ $t('pet.welcome', petData.name) }}</p>
  <div class="pet-data">
    <div class="photo-container">
      <img class="photo" :src="getPetPhoto" />
    </div>
    <div class="details">
      <span>{{ $t('pet.traits.name') }}: {{ getPetName }}</span>
      <span>{{ $t('pet.traits.kind') }}: {{ getPetKind }}</span>
      <span>{{ $t('pet.traits.weight') }}: {{ getPetWeight }}</span>
      <span>{{ $t('pet.traits.height') }}: {{ getPetHeight }}</span>
      <span>{{ $t('pet.traits.length') }}: {{ getPetLength }}</span>
      <span v-if="isCat">{{ $t('pet.traits.lives') }}: {{ getPetRemainingLives }}</span>
      <span>{{ $t('pet.traits.health') }}: {{ getPetHealth }}</span>
      <br />
      <span>{{ $t('pet.traits.description') }}:</span>
      <span>{{ getPetDescription }}</span>
    </div>
  </div>
  </div>
</template>

<style scoped lang="scss">
.pet-detail {
  width: 100%;
  margin: auto;

  p {
    text-align: center;
    margin: 32px 0px;
  }

  .pet-data {
    display: flex;

    .photo-container {
      width: 560px;
      .photo {
        max-width: 500px;
      }
    }

    .details {
      max-width: 500px;
      span {
        display: block;
      }
    }
  }
}

@media all and (max-width: 768px) {
  .pet-detail {
    .pet-data {
      flex-direction: column;

      .photo-container {
        width: unset;
        max-width: 100%;
        margin: auto;
      }

      .photo{
        width: 100%;
        margin: 0 auto 16px;
        max-width: unset;
      }
      
      .details {
        margin: 0 auto 16px;
        max-width: unset;
      }
    }
  }
}
</style>
