<script>
import { RouterView } from 'vue-router'

export default {
  components: {
    RouterView
  },
  methods: {
    redirectHome() {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<template>
  <div>
    <header>
      <img
        alt="Fever Pets logo"
        class="logo"
        src="@/assets/images/feverpets_logo.png"
        @click="redirectHome"
      />
    </header>

    <RouterView />
  </div>
</template>

<style lang="scss">
@import './assets/styles/base.scss';

#app {
  font-weight: normal;

  header {
    height: 3.5rem;
    padding: 16px;

    .logo {
      max-width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
}
</style>
