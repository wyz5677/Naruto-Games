<template>
  <div id="app">
    <entrance/>
  </div>
</template>

<script>
import entrance from './components/entrance.vue'

export default {
  name: 'App',
  components: {
    entrance
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
