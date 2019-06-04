<template>
<div>歌手界面</div>
</template>

<script>
import {getSingerList} from '../../API/singer'
const hotName = '热门'
export default {
  data () {
    return {
      singerList: []
    }
  },
  mounted () {
    this.getSingerList()
  },
  methods: {
    getSingerList () {
      getSingerList().then((res) => {
        this.singerList = res.data.list
        console.log(this.singerList)
      })
    },
    _nolmalSize (list) {
      let map = {
        hot: {
          title: hotName,
          item: []
        }
      }
      list.forEach((value, index) => {

      })
      console.log(map)
    }
  }
}
</script>

<style scoped>

</style>
