<template>
<div ref="wrapper">
  <slot></slot>
</div>
</template>

<script>
import Bsccroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new Bsccroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
    },
    // disable () {
    //   this.scroll && this.scroll.disable()
    // },
    // enable () {
    //   this.scroll && this.scroll.enable()
    // },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    watch: {
      data () {
        setTimeout(() => {
          alert(1)
        }, 2000)
      }
    }
  }
}
console.log(Bsccroll)
</script>

<style scoped lang="stylus" type="stylesheet/stylus">
</style>
