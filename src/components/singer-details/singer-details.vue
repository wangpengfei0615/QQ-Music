<template>
  <transition appear name="slide">
    <MusicList :title="title" :bg-image="bgImage" :songs="songs"></MusicList>
  </transition>
</template>
<script>
import MusicList from '../music-list/music-list'
import { getSingerDetail } from '../../API/singer'
import { ERR_OK } from '../../API/config'
import { createSong, isValidMusic, processSongsUrl } from '../../common/js/song'
import { mapGetters } from 'vuex'
export default {
  computed: {
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
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
    this._getDetail()
  },
  methods: {
    _getDetail () {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          let newList = this._normalizeSongs(res.data.list)
          processSongsUrl(newList).then((songs) => {
            this.songs = songs
          })
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        let { musicData } = item
        if (isValidMusic(musicData)) {
          ret.push(createSong(musicData))
        }
      })
      return ret
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
    transition: all 0.2s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
