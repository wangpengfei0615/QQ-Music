<template>
<div class="music-list">
  <div class="back">
    <img class="icon-back" @click="back" src="../../assent/img/back.png">
  </div>
  <h1 class="title" v-html="title"></h1>
  <div class="bg-image" :style="bgStyle" ref="bgImg">
    <div class="play-wrapper">
      <div class="play" ref="playBtn">
        <span class="text">全部歌曲</span>
      </div>
    </div>
  </div>
  <div class="bg-layer" ref="layer"></div>
    <scroll :data="songs" @scroll="scroll"
            :listen-scroll="listenScroll" :probe-type="probeType" class="list" ref="list" :click = true>
      <div class="song-list-wrapper">
      <Songlist :songs="songs" @select="select"></Songlist>
      </div>
    </Scroll>
</div>
</template>

<script>
import Scroll from '../../base/scroll/scroll'
import Songlist from '../../base/songList/songList'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      scrollY: 0
    }
  },
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default () {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    select (item, index) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    ...mapActions([
      'selectPlay'
    ]),
    scroll (pos) {
      this.scrollY = pos.y
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted () {
    this.imgHeight = this.$refs.bgImg.clientHeight
    this.$refs.list.$el.style.top = `${this.imgHeight}px`
  },
  computed: {
    bgStyle () {
      return `background-image:url(${this.bgImage})`
    }
  },
  watch: {
    scrollY (newY) {
      let scale = 1
      let zIndex = 0
      // let blur = 0
      let mintrans = 40 - (this.imgHeight)
      let translateY = Math.max(mintrans, newY)
      this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`
      let rule = Math.abs(newY / this.imgHeight)
      if (newY > 0) {
        scale = 1 + rule
        zIndex = 10
      }
      if (newY < mintrans) {
        zIndex = 10
        this.$refs.bgImg.style.paddingTop = 0
        this.$refs.bgImg.style.height = `40px`
        this.$refs.playBtn.style.display = 'none'
      } else {
        this.$refs.bgImg.style.paddingTop = '70%'
        this.$refs.playBtn.style.display = ''
        this.$refs.bgImg.style.height = 0
      }
      this.$refs.bgImg.style['transform'] = `scale(${scale})`
      this.$refs.bgImg.style.zIndex = zIndex
    }
  },
  components: {
    Scroll,
    Songlist
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      height 40px
      line-height 40px
      .icon-back
        width 18px
        height: 18px
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: absolute
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
</style>
