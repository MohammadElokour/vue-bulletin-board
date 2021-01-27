import Vue from 'vue'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import BulletinBoard from './components/BulletinBoard'
import Login from './components/Login'
import SignUp from './components/SignUp'
import {auth} from '../firebase'

const routes = [
  {path: '/bulletin-board', component: BulletinBoard},
  {path: '/login', component: Login},
  {path: '/signup', component: SignUp},
] 

auth.onAuthStateChanged(user => {
  if(user) {
    router.push('./bulletin-board');
  } else {
    router.push('./bulletin-board');
  }
})

const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
 