<template>
<div class="rank">
  <Scroll :data="topList" class="toplist" ref="toplist">
  <ul>
    <li @click="selectItem(item)" class="item" v-for="(item,index) in topList" :key="index">
      <div class="icon">
        <img width="100" height="100" v-lazy="item.picUrl" alt="暂无">
      </div>
      <ul class="songlist">
        <li class="song" v-for="(song,index) in item.songList" :key="index">
          <span>{{index+1}}</span>
          <span>{{song.songname}}-{{song.singername}}</span>
        </li>
      </ul>
    </li>
  </ul>
  </Scroll>
</div>

</template>

<script>
import {getTopList} from '../../API/rank'
import Scroll from '../../base/scroll/scroll'
export default {
  created () {
    this._getTopList()
  },
  data () {
    return {
      topList: []
    }
  },
  methods: {
    _getTopList () {
      getTopList().then((res) => {
        this.topList = res.data.topList
      })
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .rank
    position fixed
    width 100%
    top 88px
    bottom 0
    .toplist
      height 100%
      overflow: hidden
      .item
        display flex
        margin 0 20px
        padding-top 20px
        height 100px
        &:last-child
          padding-bottom 20px
        .icon
          flex 0 0 100px
          width 100px
          height 100px
        .songlist
          flex 1
          display flex
          flex-direction column
          justify-content center
          padding 0 20px
          height 100px
          overflow hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height 26px
</style>
