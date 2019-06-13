<template>
<div class="search-box">
  <i class="icon-search"></i>
  <input type="text" class="box" :placeholder="placehoder" v-model="query">
  <i class="icon-dismiss" v-show="query" @click="clear"></i>
</div>
</template>

<script>
export default {
  props: {
    placehoder: {
      type: String,
      default: '搜索歌曲，歌手'
    }
  },
  data () {
    return {
      query: ''
    }
  },
  methods: {
    clear () {
      this.query = ''
    },
    setQuery (item) {
      this.query = item
    }
  },
  created () {
    this.$watch('query', (newQuery) => {
      this.$emit('query', newQuery)
    })
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      outline: 0
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>
