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
  max-width: 1280px;
  margin: 0 auto;

  font-weight: normal;

  header {
    height: 3.5rem;
    padding: 8px;

    .logo {
      height: 100%;
      cursor: pointer;
    }
  }
}

</style>
