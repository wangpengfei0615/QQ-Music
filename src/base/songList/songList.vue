<template>
<div class="song-list">
  <ul>
    <li v-for="(item,index) in songs" :key="index">
      <div class="content">
        <h2 class="name">{{item.name}}</h2>
        <p class="desc">{{getDesc(item)}}</p>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    getDesc (song) {
      console.log(song)
      return `${song.name}/${song.album}`
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .content
    flex: 1
    line-height: 20px
    overflow: hidden
    .name
      no-wrap()
      color: $color-text
    .desc
      no-wrap()
      margin-top: 4px
      color: $color-text-d
</style>
