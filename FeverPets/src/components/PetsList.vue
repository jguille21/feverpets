<script>
import { mapMutations } from 'vuex'
import { SET_PET_SORTING, SET_PET_PAGE } from 'store/mutations.js'
import ApiPets from 'services/api-pets.js'
import ElementSorter from './ElementSorter.vue'
import ElementPaginator from './ElementPaginator.vue'
import PetTile from './PetTile.vue'
import LoadingSpinner from './LoadingSpinner.vue'

const MOCK_LOADING_TIME = 500
const PETS_BY_PAGE = 6

export default {
  components: {
    ElementSorter,
    ElementPaginator,
    PetTile,
    LoadingSpinner
  },
  data() {
    return {
      pets: null,
      pages: 0,
      currentPage: 0,
      currentPetListSorting: {
        sortBy: null,
        order: null
      },
      paramsToSortBy: ['weight', 'length', 'height', 'name', 'kind'],
      spinnerImages: [
        'src/assets/images/spinners/spinner-1.png',
        'src/assets/images/spinners/spinner-2.png',
        'src/assets/images/spinners/spinner-3.png',
        'src/assets/images/spinners/spinner-4.png',
        'src/assets/images/spinners/spinner-5.png',
        'src/assets/images/spinners/spinner-6.png'
      ],
      spinnerImage: null
    }
  },
  created() {
    const { currentPetListSorting, currentPetPage } = this.$store.state
    if (currentPetPage) {
      this.changePage(currentPetPage)
    }
    if (currentPetListSorting) {
      this.changeSorting(currentPetListSorting)
    }
  },
  methods: {
    ...mapMutations({
      setPetSorting: SET_PET_SORTING,
      setPetPage: SET_PET_PAGE
    }),
    changeSorting({ sortBy, order }) {
      this.pets = null
      this.currentPetListSorting = { sortBy, order }
      this.setPetSorting({ sortBy, order })
    },
    changePage(page) {
      this.pets = null
      this.currentPage = page
      this.setPetPage(page)
    },
    navigateToPetPage(id) {
      this.$router.push({name: 'pet', params: { id }})
    },
    retrievePetsFromApi() {
      this.setNewImageForSpinner()
      const { sortBy, order } = this.currentPetListSorting
      ApiPets.getPetsPaginatedAndSorted(this.currentPage, PETS_BY_PAGE, sortBy, order).then(response => {
        setTimeout(() => {
          this.pets = response.data
          this.pages = Math.ceil(response.headers['x-total-count'] / PETS_BY_PAGE)
        }, MOCK_LOADING_TIME)
      })
    },
    setNewImageForSpinner() {
      this.spinnerImage = this.spinnerImages[Math.floor(Math.random() * this.spinnerImages.length)]
    }
  },
  watch: {
    currentPage: function() {
      this.retrievePetsFromApi()
    },
    currentPetListSorting: function() {
      this.retrievePetsFromApi()
    }
  }
}
</script>

<template>
  <div class="pet-list">
    <ElementSorter
      :enabled="!!pets"
      :title="$t('sorter.title')"
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
    <ElementPaginator
      v-if="pets"
      class="paginator"
      :pages="pages"
      :currentPage="currentPage"
      @changePage="changePage"
    />
    <div v-if="!pets && spinnerImage"><LoadingSpinner :image="spinnerImage" /></div>
  </div>
</template>

<style scoped lang="scss">
.pet-sorter {
  margin: 16px;
}

.pet-carousel {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;

  .pet-tile-container {
    margin: 16px 0px;
  }
}

.paginator {
  width: 180px;
  margin: 16px auto;
}

.loading-spinner {
  position: absolute;
  top: 700px;
  left: 50%;
}

@media all and (max-width: 425px) {
  .loading-spinner {
    top: unset;
    bottom: 60px;
  }
}
</style>