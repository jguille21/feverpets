<script setup>
import PetOfTheDay from 'components/PetOfTheDay.vue'
import PetsList from 'components/PetsList.vue'
</script>

<template>
  <div class="main-container">
    <div class="banner"></div>
    <main>
      <p>{{ $t('home.welcome') }}</p>
      <div class="pet-day-section">
        <span>{{ $t('home.checkOutPetDay') }}</span>
        <PetOfTheDay />
      </div>
      <p>{{ $t('home.checkOutPets') }}</p>
      <PetsList />
    </main>
  </div>
</template>

<style scoped lang="scss">
.main-container {
  .banner {
    width: 100%;
    height: 120px;
    background: no-repeat url('assets/images/background.jpg');
    background-position: center 30%;
    background-size: cover;
  }

  main {
    max-width: 1280px;
    margin: 0 auto;

    .pet-day-section {
      display: flex;

      span {
        margin-right: 24px;
      }
    }
  }
}

@media all and (max-width: 1024px) {
  main {
    padding: 0 32px;
  }
}
</style>