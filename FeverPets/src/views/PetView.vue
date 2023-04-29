<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <p><RouterLink :to="{ name: 'home' }">Go back</RouterLink></p>
  </main>
</template>
