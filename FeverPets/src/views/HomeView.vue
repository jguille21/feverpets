<script setup>
import PetsList from '../components/PetsList.vue'
</script>

<template>
  <main>
    <p>{{ $t('home.welcome') }}</p>
    <PetsList />
  </main>
</template>
