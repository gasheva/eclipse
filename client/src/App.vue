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
import Navbar   from '@/components/app/Navbar.vue';
import Footbar  from '@/components/app/Footbar.vue';
import messages from '@/plugins/messages';

export default {
    components: {Navbar, Footbar},
    computed:   {
        error() {
            return this.$store.getters.error;
        },
    },
    watch:      {
        // отслеживание ошибок
        error(err) {
            if (!err) return;
            // показ ошибки при помощи плагина
            this.$error(messages[err] || 'Что-то пошло не так');
            this.$store.commit('CLEAR_ERROR');
        },
    },
};
</script>

<style lang="scss">

body {
    background-color: $main-background;
}

main {
    flex: 1 0 auto;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
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
