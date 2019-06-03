<template>
  <div>
   <Silder>
     <div v-for="item in recommdend" :key="item">
       <a :href="item.linkUrl">
         <img :src="item.picUrl" alt="">
       </a>
     </div>
   </Silder>
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
        console.log(this.recommdend)
      })
    }
  },
  components: {
    Silder
  }
}
</script>

<style scoped>

</style>
