<script>
import PET_KINDS from 'constants/pet-kinds.js'
import { getPetHealthTier } from 'helpers/pet-health-calculator.js'

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
  },
  methods: {
    toggleHover() {
      this.isHovered = !this.isHovered
    }
  }
}
</script>

<template>
  <div class="pet-tile" v-on:mouseenter="toggleHover" v-on:mouseleave="toggleHover" @error="imageUrlAlt">
    <div class="photo" v-bind:style="{ backgroundImage: 'url(' + this.getPetPhoto + ')' }"></div>
    <div class="name">{{ this.getPetName }}</div>
    <div v-if="isHovered" class="details">
      <span>{{ $t('pet.traits.name') }}: {{ getPetName }}</span>
      <span>{{ $t('pet.traits.kind') }}: {{ getPetKind }}</span>
      <span>{{ $t('pet.traits.weight') }}: {{ getPetWeight }}</span>
      <span>{{ $t('pet.traits.height') }}: {{ getPetHeight }}</span>
      <span>{{ $t('pet.traits.length') }}: {{ getPetLength }}</span>
      <span v-if="isCat">{{ $t('pet.traits.lives') }}: {{ getPetRemainingLives }}</span>
      <span>{{ $t('pet.traits.health') }}: {{ getPetHealth }}</span>
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
    background-color: rgba($color: $color-background, $alpha: 0.8);
    padding: 60px 90px;
    line-height: 32px;

    span {
      display: block;
    }
  }
}

@media all and (max-width: 425px) {
  .pet-tile {
    width: 300px;
    height: 300px;

    .photo {
      height: 270px;
    }
  }
}
</style>
