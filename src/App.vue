<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import "assets/css/variables";

  #app {
    background-color: var(--color-bg);
    font-family: Overpass, Helvetica, sans-serif;
    color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  body {
    margin: 0;
  }

</style>



