<template>
  <span>
    <span
      v-for="(item, index) in segmentsWithPerplexity"
      :key="index"
      :style="{backgroundColor: `rgb(150, 100, 0, ${1 - item.perplexity / 20})`}"
    >{{item.segment}}</span>
  </span>
</template>

<script>
  import {perplexity} from './model'

  export default {
    name: 'TextPerplexity',
    props: ['text'],
    data() {
      return {
        segmentLength: 5
      }
    },
    computed: {
      segmentsWithPerplexity() {
        const segments = []
        for (let start = 0; start <= this.text.length; start += this.segmentLength) {
          // Perplexity taken over a "window" of three segments, of which the current one is in the middle
          const segmentForPerplexity = this.text.substr(start - this.segmentLength, 3 * this.segmentLength)

          segments.push({
            segment: this.text.substr(start, this.segmentLength),
            perplexity: perplexity(segmentForPerplexity)
          })
        }
        return segments
      }
    }
  }
</script>

<style scoped>
  span {
    color: black;
  }
</style>
