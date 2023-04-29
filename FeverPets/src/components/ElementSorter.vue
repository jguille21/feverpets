<script>
const SORT_ORDERS = {
  ASC: 'asc',
  DESC: 'desc'
}

export default {
  data() {
    return {
      currentSorting: null,
      sortingOrder: SORT_ORDERS.ASC
    }
  },
  props: {
    title: {
      type: String,
      default: 'Sort by: '
    },
    paramsToSortBy: {
      type: Array,
      required: true
    },
    defaultSorting: {
      type: Object,
      default: null
    }
  },
  mounted() {
    if (this.defaultSorting) {
      const { sortBy, order } = this.defaultSorting
      this.currentSorting = sortBy
      this.sortingOrder = order
    }
  },
  methods: {
    changeSorting(newSorting) {
      this.sortingOrder = (this.currentSorting !== newSorting || this.sortingOrder === SORT_ORDERS.DESC) ? SORT_ORDERS.ASC : SORT_ORDERS.DESC
      this.currentSorting = newSorting
      this.$emit('changeSorting', { sortBy: this.currentSorting, order: this.sortingOrder })
    },
    clearSorting() {
      this.sortingOrder = SORT_ORDERS.ASC
      this.currentSorting = null
      this.$emit('changeSorting', { sortBy: this.currentSorting, order: this.sortingOrder })
    },
    getParamClass(param) {
      let paramClass = ''
      if (this.currentSorting === param) {
        paramClass = this.sortingOrder
      }
      return paramClass
    }
  },
  computed: {
    showClearSorting() {
      return this.currentSorting !== null
    }
  }
}
</script>

<template>
  <div class="element-sorter">
    <span>{{ title }}</span>
    <div class="sort-params" v-for="param in paramsToSortBy" :key="param">
      <button :class="getParamClass(param)" @click="changeSorting(param)">{{ param }}</button>
    </div>
    <img
      v-if="showClearSorting"
      class="clear-sorting"
      src="src/assets/images/clear_sorting.png"
      @click="clearSorting"
    />
  </div>
</template>

<style scoped lang="scss">
@import 'src/assets/styles/button.scss';

.element-sorter {
  display: flex;
  flex-direction: row;
  min-height: 40px;

  .asc:after {
    content: ' ▲';
  }

  .desc:after {
    content: ' ▼';
  }

  span {
    margin-right: 8px;
  }

  button {
    min-width: 80px;
    margin: 0px 8px;
  }

  .clear-sorting {
    width: 40px;
    height: 40px;
    margin-left: 10px;
    cursor: pointer;
    position: relative;
    bottom: 4px;
  }
}
</style>