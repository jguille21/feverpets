<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="loading-spinner">
    <img :src="image" />
    <p>{{ $t('home.loading') }}</p>
  </div>
</template>

<style scoped lang="scss">
.loading-spinner {
  width: 200px;
  margin:-100px 0 0 -100px;
  img {
    width: 200px;
    -webkit-animation:spin 4s linear infinite;
    -moz-animation:spin 4s linear infinite;
    animation:spin 4s linear infinite;
  }
  @-moz-keyframes spin { 
      100% { -moz-transform: rotate(360deg); } 
  }
  @-webkit-keyframes spin { 
      100% { -webkit-transform: rotate(360deg); } 
  }
  @keyframes spin { 
    100% { 
        -webkit-transform: rotate(360deg); 
        transform:rotate(360deg); 
    } 
  }

  p {
    margin-top: 32px;
  }
}
</style>