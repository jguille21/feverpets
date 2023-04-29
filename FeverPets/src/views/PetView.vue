<script setup>
import { RouterLink } from 'vue-router'
import PetDetail from '../components/PetDetail.vue'
</script>

<template>
  <main>
    <p><RouterLink :to="{ name: 'home' }">Go back</RouterLink></p>
    <PetDetail />
  </main>
</template>
