import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Trombinoscope from '@/components/Trombinoscope'
import Account from '@/components/Account'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/trombinoscope',
      name: 'Trombinoscope',
      component: Trombinoscope
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    }
  ]
})
