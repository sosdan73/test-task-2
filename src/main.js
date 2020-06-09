import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import VueResource from 'vue-resource'
import App from './App.vue'
import { store } from './store/store'

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
  routes,
  mode: 'history'
});
export const eventBus = new Vue();

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
  vue.$http.get('https://test2-4fbba.firebaseio.com/suborders.json')
  .then(response => {
    return response.json()
  }).then(data => {
    for (let key in data) {
      if (data[key].sub_code == value) {
        let object = data[key];
        object.status++;
        vue.$http.post('https://test2-4fbba.firebaseio.com/suborders/' + key + '.json', object, {
          headers: {
            'X-HTTP-Method-Override': 'PUT'
          },
          emulateHTTP: true
        })
      }
    }
  }).then(response => {
    eventBus.$emit('updateSuborder', value)
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