import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import VueResource from 'vue-resource'
import App from './App.vue'

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  filters: {
    spacer(value) {
      let string = value.toString();
      return string.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    }
  },
  render: h => h(App)
})
