<script>
import { mapGetters, mapActions } from 'vuex'
import { GET_PET_OF_THE_DAY } from '../store/getters.js'
import { PERSIST_PET_OF_THE_DAY } from '../store/actions.js'
import ApiPets from '../services/api-pets.js'

export default {
  data() {
    return {
      pets: null,
      petOfTheDay: null
    }
  },
  mounted() {
    this.petOfTheDay = this.getPetOfTheDay
    ApiPets.getAllPets().then(response => {
      this.pets = response.data
    })
  },
  computed: {
    ...mapGetters({
      getPetOfTheDay: GET_PET_OF_THE_DAY
    }),
    buttonClass() {
      return !this.pets ? 'disabled' : ''
    }
  },
  methods: {
    ...mapActions({
      persistPetOfTheDay: PERSIST_PET_OF_THE_DAY
    }),
    showPetOfTheDay() {
      if (!this.petOfTheDay) {
        this.getNewPetOfTheDay()
      }
      this.$router.push({name: 'pet', params: { id: this.petOfTheDay.id }})
    },
    getNewPetOfTheDay() {
      this.petOfTheDay = this.pets[Math.floor(Math.random() * this.pets.length)]
      this.persistPetOfTheDay(this.petOfTheDay)
    }
  }
}
</script>

<template>
  <div>
    <button
      :class="buttonClass"
      @click="showPetOfTheDay"
    >
      {{ $t('home.petOfTheDay') }}
    </button>
  </div>
</template>

<style scoped lang="scss">
@import 'src/assets/styles/button.scss';
</style>