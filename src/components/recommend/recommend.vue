<template>
  <div class="recommend" ref="recommend">
    <div class="recommend-content">
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
  </div>
    </div>
  </div>
</template>
<script>
import {getRecommend} from '../../API/recommend'
import Silder from '../../base/silder/silder'
export default {
  data () {
    return {
      recommdend: []
    }
  },
  created () {
    this.getRecommend()
  },
  methods: {
    getRecommend () {
      getRecommend().then((res) => {
        this.recommdend = res.data.slider
      })
    }
  },
  components: {
    Silder
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
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
