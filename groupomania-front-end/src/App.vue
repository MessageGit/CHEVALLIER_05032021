<template>
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&family=Ubuntu:wght@300&display=swap" rel="stylesheet">
  <router-view/>
</template>

<script>
export default {
  created() { document.title = "Groupomania - Parlez de tout et de rien entre collègues !"; }
}
</script>

<style lang="scss">
#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
