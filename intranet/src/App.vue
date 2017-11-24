<template>
  <div id="app">
    <link rel="stylesheet" href="../node_modules/materialize-css/dist/css/materialize.min.css">

    <md-toolbar>
      <h1 class="md-title">Best intranet EUW</h1>
    </md-toolbar>


    <!--
    <img src="./assets/logo.png">
    -->

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
