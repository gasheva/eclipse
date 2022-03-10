import Vue       from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path:      '/',
        name:      'Currencies',
        component: () => import(/* webpackChunkName: "currencies" */ '@/views/Currencies.vue'),
    },
    {
        path:      '/converter',
        name:      'Converter',
        component: () => import(/* webpackChunkName: "converter" */'@/views/Converter.vue'),
    },
    {
        path:     '/*',
        redirect: () => '/',
    },

];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
