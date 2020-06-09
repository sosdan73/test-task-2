<template>
  <div id="app">
    <header-app></header-app>
    <router-view></router-view>
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
  text-align: center;
  padding-bottom: 20vw;
}

h1, h2 {
  font-weight: normal;
  margin: 0;
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

@mixin button {
  text-align: center;
  font-size: 2vw;
  border: 1px solid #42b983;
  color: #2c3e50;
  padding: 1vw;
  transition: background-color .15s ease-in-out;
  cursor: pointer;
}

.btn-primary {
  @include button;
}
.btn-primary:hover {
  background-color: #42b983;
}
.btn-container {
  display: grid;
  width: 100%;
  justify-content: center;
}
.form {
    .input {
        width: 100%;
        margin: auto;
        border: none;
        border-bottom: 1px solid #42b983;
        outline: none;
        display: block;
        font-size: 1.5vw;
        text-align: center;
    }
    .btn {
        font-size: 1.5vw;
        border-radius: 0px;
        width: 100%;
    }
    .disabled {
        font-size: 1.5vw;
        background-color: #bbb;
        border: 1px solid #888;
        cursor: default;
    }
}
.input::-webkit-outer-spin-button,
.input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
