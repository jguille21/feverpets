<script>
import { mapMutations } from 'vuex'
import { SET_PET_SORTING, SET_PET_PAGE } from '../store/mutations.js'
import ApiPets from '../services/api-pets.js'
import ElementSorter from './ElementSorter.vue'
import ElementPaginator from './ElementPaginator.vue'
import PetTile from './PetTile.vue'

const MOCK_LOADING_TIME = 0
const PETS_BY_PAGE = 6

export default {
  components: {
    ElementSorter,
    ElementPaginator,
    PetTile
  },
  data() {
    return {
      pets: null,
      pages: 0,
      currentPage: 1,
      currentPetListSorting: {
        sortBy: null,
        order: null
      },
      paramsToSortBy: ['weight', 'length', 'height', 'name', 'kind']
    }
  },
  mounted() {
    const { currentPetListSorting, currentPetPage } = this.$store.state
    if (currentPetPage) {
      this.changePage(currentPetPage)
    }
    if (currentPetListSorting) {
      this.changeSorting(currentPetListSorting)
    }

    this.retrievePetsFromApi()
  },
  methods: {
    ...mapMutations({
      setPetSorting: SET_PET_SORTING,
      setPetPage: SET_PET_PAGE
    }),
    changeSorting({ sortBy, order }) {
      this.currentPetListSorting = { sortBy, order }
      this.setPetSorting({ sortBy, order })
    },
    changePage(page) {
      this.currentPage = page
      this.setPetPage(page)
    },
    navigateToPetPage(id) {
      this.$router.push({name: 'pet', params: { id }})
    },
    retrievePetsFromApi() {
      const { sortBy, order } = this.currentPetListSorting
      ApiPets.getPetsPaginatedAndSorted(this.currentPage, PETS_BY_PAGE, sortBy, order).then(response => {
        setTimeout(() => {
          this.pets = response.data
          this.pages = response.headers['x-total-count'] / PETS_BY_PAGE // TODO round
        }, MOCK_LOADING_TIME)
      })
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
      v-if="pets"
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
      <ElementPaginator
        class="paginator"
        :pages="pages"
        :currentPage="currentPage"
        @changePage="changePage"
      />
    </div>
    <div v-else>{{ $t('home.loading') }}</div>
  </div>
</template>

<style scoped lang="scss">
.pet-sorter {
  margin: 16px;
}

.pet-carousel {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  .pet-tile-container {
    margin: 16px 0px;
  }

  .paginator {
    width: 180px;
    margin: 32px auto;
  }
}
</style>