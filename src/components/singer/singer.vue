<template>
  <div class="singer">
  <list-view :data = 'finalList' @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import {getSingerList} from '../../API/singer'
import listView from '../../base/listView/listView'
import {mapMutations} from 'vuex'
const hotName = '热门'
const hotSingerLen = 10
export default {
  components: {
    listView
  },
  data () {
    return {
      singerList: [],
      finalList: []
    }
  },
  mounted () {
    this.getSingerList()
  },
  methods: {
    selectSinger (item) {
      this.$router.push({
        path: `/singer/${item.id}`
      })
      this.setSinger(item)
    },
    getSingerList () {
      getSingerList().then((res) => {
        this.singerList = res.data.list
        this.finalList = this._nolmalSize(this.singerList)
      })
    },
    _nolmalSize (list) {
      let map = {
        hot: {
          title: hotName,
          item: []
        }
      }
      console.log(list, '123123')
      list.forEach((value, index) => {
        if (index < hotSingerLen) {
          console.log(value)
          map.hot.item.push(
            {
              id: value.Fsinger_mid,
              name: value.Fsinger_name,
              avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${value.Fsinger_mid}.jpg?max_age=2592000`
            }
          )
        }
        const key = value.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            item: []
          }
        }
        map[key].item.push({
          id: value.Fsinger_mid,
          name: value.Fsinger_name,
          avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${value.Fsinger_mid}.jpg?max_age=2592000`
        })
      })
      // 重排序
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === hotName) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    ...mapMutations({
      setSinger: 'SingerData'
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
