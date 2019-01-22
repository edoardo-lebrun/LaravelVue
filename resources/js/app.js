
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

Vue.component('example-component', require('./components/ExampleComponent.vue'));

import App from '../js/components/App'
import Home from '../js/components/Welcome'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Board'

// const files = require.context('./', true, /\.vue$/i)

// files.keys().map(key => {
//     return Vue.component(_.last(key.split('/')).split('.')[0], files(key))
// })

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/user-login',
            name: 'login',
            component: Login,
        },
        {
            path: '/register-user',
            name: 'register',
            component: Register
        },
        {
            path: '/board',
            name: 'board',
            component: Dashboard,
            props: true
        }
    ]
});

const app = new Vue({
    el: '#app',
    components: { App },
    router
});


