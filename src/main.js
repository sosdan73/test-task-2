import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
// import VueResource from 'vue-resource'
import App from './App.vue'
import { store } from './store/store'
import axios from 'axios'

Vue.use(VueRouter);
// Vue.use(VueResource);

export const router = new VueRouter({
  routes,
  mode: 'history'
});

export const eventBus = new Vue();

axios.defaults.baseURL = 'https://test2-4fbba.firebaseio.com/';
axios.defaults.headers.get['Accepts'] = 'application/json'

const vue = new Vue({
  el: '#app',
  router,
  store,
  filters: {
    spacer(value) {
      let string = value.toString();
      return string.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    }
  },
  render: h => h(App)
})

const changeSubstatus = (value) => {
  axios.get('suborders.json?auth=' + store.state.idToken)
  .then(response => {
    for (let key in response.data) {
      if (response.data[key].sub_code == value) {
        let object = response.data[key];
        object.status++;
        axios.put('suborders/' + key + '.json?auth=' + store.state.idToken, object)
        .then(() => {
          eventBus.$emit('updateSuborder', value)
        })
      }
    }
  })
}
eventBus.$on('suborderWanted', value => {
  setTimeout(() => {
    changeSubstatus(value)
  }, 3000);
  setTimeout(() => {
    changeSubstatus(value)
  }, 10000);
})