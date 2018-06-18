<template>
  <v-app id="app">
    <h1>Trivia-matic!</h1>
    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  color: #2c3e50;
  width: 75%;
  margin: 20px auto;
}

h1 {
  color:rgb(28, 146, 219);
  text-decoration: underline rgb(58, 194, 58);
}
</style>
