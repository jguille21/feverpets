<script>
import PET_KINDS from '../constants/pet-kinds.js'
import { HEALTH_RANGES, HEALTH_THRESHOLDS} from '../constants/health.js'

export default {
  data() {
    return {
      isHovered: false
    }
  },
  props: {
    petData: {
      type: Object,
      required: true
    }
  },
  computed: {
    isCat() {
      return this.petData.kind === PET_KINDS.CAT
    },
    getPetPhoto() {
      const photoURL = this.petData['photo_url']
      const isValidUrl = photoURL.match(/^https?:\/\/.+\/.+.(jpeg|jpg|gif|png)$/)
      return (isValidUrl) ? photoURL : 'src/assets/images/no_image.jpg'
    },
    getPetName() {
      return this.petData.name
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
      const { weight, height, length } = this.petData
      const healthLevel = weight / (height * length)

      let healthTier = this.calculateDefaultHealthTier(healthLevel)
      healthTier = this.overwriteHealthTierByKind(healthTier, this.petData.kind)

      return healthTier
    }
  },
  methods: {
    toggleHover() {
      this.isHovered = !this.isHovered
    },
    calculateDefaultHealthTier(healthLevel) {
      const { HEALTHY, VERY_HEALTHY } = HEALTH_THRESHOLDS
  
      if (healthLevel >= VERY_HEALTHY.min && healthLevel <= VERY_HEALTHY.max) return HEALTH_RANGES.VERY_HEALTHY
      if (healthLevel >= HEALTHY.min && healthLevel <= HEALTHY.max) return HEALTH_RANGES.HEALTHY

      return HEALTH_RANGES.UNHEALTHY
    },
    overwriteHealthTierByKind(defaultHealth, kind) {
      let health = defaultHealth
  
      switch (kind) {
        case PET_KINDS.CAT:
          if (this.petData['number_of_lives'] === 1) {
            health = HEALTH_RANGES.UNHEALTHY
          }
          break;
      }

      return health
    }
  }
}
</script>

<template>
  <div class="pet-tile" v-on:mouseenter="toggleHover" v-on:mouseleave="toggleHover" @error="imageUrlAlt">
    <div class="photo" v-bind:style="{ backgroundImage: 'url(' + this.getPetPhoto + ')' }"></div>
    <div class="name">{{ this.getPetName }}</div>
    <div v-if="isHovered" class="details">
      <span>Name: {{ getPetName }}</span>
      <span>Kind: {{ getPetKind }}</span>
      <span>Weight: {{ getPetWeight }}</span>
      <span>Height: {{ getPetHeight }}</span>
      <span>Length: {{ getPetLength }}</span>
      <span v-if="isCat">Remaining lives: {{ getPetRemainingLives }}</span>
      <span>Health: {{ getPetHealth }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'src/assets/styles/colors.scss';

.pet-tile {
  border-radius: 20px;
  width: 400px;
  height: 400px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  background-color: $color-background-darker;

  .photo {
    width: 100%;
    height: 370px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .name {
    text-align: center;
    font-weight: bold;
  }

  .details {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: $color-background, $alpha: 0.7);
    padding: 16px;

    span {
      display: block;
    }
  }
}
</style>
