<script>
export default {
  props: {
    pages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    }
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page)
    }
  }
}
</script>

<template>
  <div class="element-paginator">
    <ul class="pages-numbers">
      <li v-for="index in pages" :key="index">
        <span
          :class="{ current: index === currentPage }"
          @click="changePage(index)"
        >
          {{ index }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.pages-numbers {
  list-style: none;
  display: flex;
  align-items: stretch; /* Default */
  justify-content: space-between;
  width: 100%;
  margin: 0;
  padding: 0;

  li {
    display: block;
    flex: 0 1 auto; /* Default */
    list-style-type: none;
    cursor: pointer;
    user-select: none;

    span {
      padding: 4px 10px;

      &.current {
        font-weight: bold;
        border: 1px solid white;
        border-radius: 50%;
      }
    }
  }
}
</style>