<template>
  <transition appear name="slide">
    <MusicList :title="title" :bg-image="bgImage" :songs="songs"></MusicList>
  </transition>
</template>
<script>
import MusicList from '../music-list/music-list'
import {mapGetters} from 'vuex'
import {getSongList} from '../../API/recommend'
import { createSong, isValidMusic, processSongsUrl } from '../../common/js/song'
const ERR_OK = 0
export default {
  computed: {
    title () {
      return this.disc.dissname
    },
    bgImage () {
      return this.disc.imgurl
    },
    ...mapGetters(['disc'])
  },
  data () {
    return {
      songs: []
    }
  },
  created () {
    console.log(this.disc, '这是disc')
    this._getSongList()
  },
  methods: {
    _getSongList () {
      if (!this.disc.dissid) {
        console.log(10086)
      }
      getSongList(this.disc.dissid).then((res) => {
        if (res.code === ERR_OK) {
          processSongsUrl(this._normalizeSongs(res.cdlist[0].songlist)).then((songs) => {
            this.songs = songs
          })
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((musicData) => {
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
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
