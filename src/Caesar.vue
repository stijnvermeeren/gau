<template>
  <div>
    <h2>Caesar code</h2>
    <div>
      <textarea v-model="code" cols="60" rows="8" />
    </div>
    <h2>Results</h2>
    <table>
      <tbody>
      <tr>
        <th>Shift (encode)</th>
        <th>Shift (decode)</th>
        <th>Plain text</th>
        <th>Perplexity</th>
      </tr>
      <tr
        v-for="{key, text, perplexity} in results"
        :key="key"
        :class="{good: perplexity < 7}"
      >
        <td>{{letterToShift(key)}} ({{key.toUpperCase()}})</td>
        <td>{{26-letterToShift(key)}} ({{shiftToLetter(-letterToShift(key)).toUpperCase()}})</td>
        <td><text-perplexity :text="text" /></td>
        <td>{{perplexity}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import {perplexity, alphabet} from './model'
  import TextPerplexity from './TextPerplexity'

  export default {
    name: 'Caesar.vue',
    components: {TextPerplexity},
    data() {
      return {
        code: 'exxegoexsrgi'
      }
    },
    computed: {
      alphabet() {
        return alphabet
      },
      results() {
        return this.alphabet.map(key => {
          const text = this.decode(this.code, key)
          return {
            key,
            text,
            perplexity: this.perplexity(text)
          }
        })
      }
    },
    methods: {
      shiftToLetter(shift) {
        return String.fromCharCode('a'.charCodeAt(0) + this.mod(shift, 26))
      },
      letterToShift(letter) {
        return letter.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0)
      },
      decode(word, key) {
        const shift = this.letterToShift(key)
        return word.split("").map(letter => {
          if (!alphabet.includes(letter.toLowerCase())) {
            return letter
          }

          // Maintains case
          const newValue = this.letterToShift(letter) - shift

          if (newValue < 0) {
            return String.fromCharCode(letter.charCodeAt(0) + 26 - shift)
          } else {
            return String.fromCharCode(letter.charCodeAt(0) - shift)
          }
        }).join("")
      },
      // Normal mathematical modulo operation, see https://stackoverflow.com/a/4467559
      mod(n, mod) {
        return ((n % mod) + mod) % mod;
      },
      perplexity(text) {
        return perplexity(text)
      }
    }
  }
</script>

<style>
  tr.good {
    font-weight: bold;
  }
</style>
