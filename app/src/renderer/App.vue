<template>
  <div id="#app">
    <router-view></router-view>
  </div>
</template>

<script>
import store from 'renderer/vuex/store'
export default {
  store
}
</script>
<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  font-size: 100%;
}
</style>
