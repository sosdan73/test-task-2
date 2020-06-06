<template>
  <div id="app">
    <header-app></header-app>
    <registration-app></registration-app>
  </div>
</template>

<script>
    import Header from './components/Header'
    import Registration from './components/Registration'
    export default {
        name: 'app',
        data () {
            return {
                user: {
                  login: 'dan',
                  password: 1234
                }
            }
        },
        components: {
            headerApp: Header,
            registrationApp: Registration,
        }
    }
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  text-decoration: none;
  color: #42b983;
}
</style>
