<script setup>
import { RouterLink } from 'vue-router'
import PetDetail from '../components/PetDetail.vue'
</script>

<template>
  <main>
    <PetDetail />
    <button><RouterLink :to="{ name: 'home' }">{{ $t('pet.buttons.back') }}</RouterLink></button>
  </main>
</template>

<style scoped lang="scss">
@import '@/assets/styles/button.scss';
main {
  max-width: 1280px;
  margin: 0 auto;

  button {
    display: block;
    margin: 32px auto;
  }
}
</style>
