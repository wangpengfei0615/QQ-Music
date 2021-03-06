<template>
<Scroll class="listview" :data = data ref='listView' :listenScroll = 'listenScroll'
@scroll="scroll"  :probe-type = 'probeType' :click = true>
  <ul>
    <li v-for="(group,index) in data" :key="index" class="list-group" ref="listGroup">
      <h2 class="list-group-title">{{group.title}}</h2>
      <uL>
        <li v-for="(item,index) in group.item"
            :key="index"
            class="list-group-item"
            @click="selectIndex(item)"
        >
          <img class="avatar" v-lazy="item.avatar">
          <span class="name">{{item.name}}</span>
        </li>
      </uL>
    </li>
  </ul>
  <div class="list-shortcut" @touchstart ='onShortcutTouchStart' @touchmove.stop.prevent = 'onShortMove' @touchend.stop>
    <ul>
      <li v-for="(item,index) in shortList" class="item" :key="index" :data-index = 'index'
        :class= "{'current':currentIndex === index}">
        {{item}}
      </li>
    </ul>
  </div>
</Scroll>
</template>
<script>
import Scroll from '../../base/scroll/scroll'
import {getindex} from '../../common/js/dom'
const ANCHOR_HEIGHT = 18
export default {
  data () {
    return {
      scrollY: -1,
      currentIndex: 0
    }
  },
  components: {Scroll},
  created () {
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
    this.touch = {}
    this.diff = -1
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },

  computed: {
    shortList () {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  },
  methods: {
    selectIndex (item) {
      this.$emit('select', item)
    },
    onShortcutTouchStart (e) {
      let anchorIndex = getindex(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this.$refs.listView.scrollToElement(this.$refs.listGroup[anchorIndex], 0)
      this._scrollTo(anchorIndex)
    },
    onShortMove (e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    refresh () {
      this.$refs.listView.refresh()
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    _scrollTo (index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0)
      this.scrollY = this.$refs.listView.scroll.y
    },
    calHeight () {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.calHeight()
      }, 20)
    },
    scrollY (newY) {
      const listHeight = this.listHeight
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      this.currentIndex = listHeight.length - 2
    }
  },
  component: {
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
