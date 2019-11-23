<template>
  <div id="app">
    <h1>Gau</h1>
    <div><button @click="page = 'caesar'">Caesar</button> <button @click="page = 'viginere'">Viginere</button></div>
    <div>
      <caesar v-if="page === 'caesar'" />
      <viginere v-if="page === 'viginere'" />
    </div>
  </div>
</template>

<script>
  import Caesar from './Caesar'
  import Viginere from './Viginere'

  export default {
    name: 'app',
    components: {Caesar, Viginere},
    data() {
      return {
        page: 'caesar'
      }
    }
  }
</script>

