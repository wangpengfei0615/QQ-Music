<template>
  <div class="recommend" ref="recommend">
    <Scroll class="recommend-content" :data="discList">
  <div>
    <div class="slider-wrapper" v-if="recommdend.length">
   <Silder>
     <div v-for="(item, index) in recommdend" :key="index">
       <a :href="item.linkUrl">
         <img :src="item.picUrl" alt="">
       </a>
     </div>
   </Silder>
    </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li v-for="(item, index) in discList" :key="index" class="item" @click="selectItem(item)">
            <div class="icon">
            <img v-lazy="item.imgurl" alt="" width="60">
            </div>
            <div class="text">
              <h2 class="name" v-html="item.creator.name"></h2>
              <p class="desc" v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
  </div>
    </Scroll>
    <router-view></router-view>
  </div>
</template>
<script>
import {getRecommend, getDiscList} from '../../API/recommend'
import Silder from '../../base/silder/silder'
import Scroll from '../../base/scroll/scroll'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      recommdend: [],
      discList: []
    }
  },
  created () {
    this.getRecommend()
    this.getDiscList()
  },
  methods: {
    getRecommend () {
      getRecommend().then((res) => {
        this.recommdend = res.data.slider
      })
    },
    selectItem (item) {
      this.$router.push({
        path: `recommend/${item.dissid}`
      })
      this.setDisc(item)
    },
    getDiscList () {
      getDiscList().then((res) => {
        this.discList = res.data.list
        console.log(this.discList)
      })
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  },
  components: {
    Silder,
    Scroll
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" >
  @import "~common/stylus/variable"
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
