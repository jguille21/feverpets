<script setup>
import PetOfTheDay from '../components/PetOfTheDay.vue'
import PetsList from '../components/PetsList.vue'
</script>

<template>
  <main>
    <p>{{ $t('home.welcome') }}</p>
    <p>{{ $t('home.checkOutPetDay') }}</p>
    <PetOfTheDay />
    <p>{{ $t('home.checkOutPets') }}</p>
    <PetsList />
  </main>
</template>
