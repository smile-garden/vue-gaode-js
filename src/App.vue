<template>
  <div id="app">
    <div class="nav-box">
      <router-link to="/">Map-Search</router-link> |
      <router-link to="/marker">Map-Marker</router-link>
    </div>
    <hr>
    <router-view />
  </div>
  
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="less" scoped>
.nav-box {
  padding: 20px 0;
  text-align: center;
  font-size: 24px;
}
</style>

