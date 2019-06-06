<template>
  <transition appear name="slide">
    <div class="singer-details">
      <MusicList :title="title" :bg-image ='bgImage' :songs = 'thySong'></MusicList>
    </div>
  </transition>
</template>
<script>
import {mapGetters} from 'vuex'
import {getSingerDetails} from '../../API/singer'
import {createSong} from '../../API/song'
import MusicList from '../../components/music-list/music-list'

export default {
  computed: {
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    },
    thySong () {
      return this.songs
    },
    ...mapGetters([
      'singer'
    ])
  },
  data () {
    return {
      songs: []
    }
  },
  created () {
    this._getSingerDetails()
  },
  methods: {
    _getSingerDetails () {
      getSingerDetails(this.singer.id).then((res) => {
        this.songs = this._normallizeSongs(res.data.list)
      })
    },
    _normallizeSongs (list) {
      let sum = []
      list.forEach((list) => {
        let {musicData} = list
        sum.push(createSong(musicData))
      })
      return sum
    }
  },
  components: {
    MusicList
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .singer-details
    position fixed
    z-index 100
    background-color $color-background
    top:0
    bottom 0
    left 0
    right 0
  .slide-enter-active, .slide-leave-active
    transition: all 0.5s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
