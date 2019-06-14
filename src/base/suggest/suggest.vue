<template>
<scroll class="suggest" :data = "result">
<ul class="suggest-list">
  <li class="suggest-item" v-for="(item, index) in result" :key="index" @click="setItem(item)">
    <div class="icon">
      <i :class="getIconCls(item)"></i>
    </div>
    <div class="name">
      <p class="text" v-html="getDisplayName(item)"></p>
    </div>
  </li>
</ul>
</scroll>
</template>
<script>
import {search} from '../../API/search'
import {filterSinger} from '../../common/js/song'
import Scroll from '../../base/scroll/scroll'
import { mapMutations ,mapActions} from 'vuex'
export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      page: 1,
      result: []
    }
  },
  watch: {
    query (item) {
      this.search(item)
    }
  },
  methods: {
    search () {
      search(this.query, this.page, this.showSinger).then((res) => {
        this.result = this._genResult(res.data)
        console.log(this.result)
      })
    },
    _genResult (data) {
      let ret = []
      if (data.zhida && data.zhida.singerid && this.page === 1) {
        ret.push({...data.zhida, ...{type: 'singer'}})
      }
      if (data.song) {
        ret = ret.concat(data.song.list)
      }
      return ret
    },
    getDisplayName (item) {
      if (item.type === 'singer') {
        return item.singername
      } else {
        return `${item.songname}-${filterSinger(item.singer)}`
      }
    },
    getIconCls (item) {
      if (item.type === 'singer') {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    setItem (item) {
      if (item.type === 'singer') {
        console.log(item)
        let singer = {
          id: item.singermid,
          name: item.singername,
          avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.singermid}.jpg?max_age=2592000`
        }
        this.$router.push({
          path: `/search/001BLpXF2DyJe2`
        })
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
    },
    ...mapMutations({
      setSinger: 'SingerData'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  components: {
    Scroll
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
