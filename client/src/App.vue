<template>
  <div id="app">
    <navbar/>
    <main>
      <router-view/>
    </main>
    <footer>
      <footbar/>
    </footer>
  </div>
</template>

<script>
import Navbar from './components/app/Navbar.vue'
import Footbar from './components/app/Footbar.vue'
export default {
  components:{Navbar, Footbar},
}
</script>

<style>
body{
  background-color: teal;
}
main{
  flex: 1 0 auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

#nav {
  padding: 30px;
  margin-bottom: 3em;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
