import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Trombinoscope from '@/components/Trombinoscope'
import Account from '@/components/Account'
import Mater from '@/components/Mater'
import Grade from '@/components/Grade'

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
    },
    {
      path: '/mater',
      name: 'Mater',
      component: Mater
    },
    {
      path: '/grade',
      name: 'Grade',
      component: Grade
    }
  ]
})
