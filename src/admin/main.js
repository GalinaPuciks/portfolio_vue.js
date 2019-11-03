import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Header from './components/header/header';
import About from './components/about/about';
import Works from './components/works/works';
import Reviews from './components/reviews/reviews';

const router = new VueRouter({
  routes: [
    {path: '/', component: About},
    {path: '/', component: Header},
    {path: '/reviews', component: Reviews},
    {path: '/works', component: Works},
  ]
});

Vue.use(VueRouter);

new Vue({
  el: "#app-root",
  router,
  render: h => h(App)
});