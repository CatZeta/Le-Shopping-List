import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/auth/Login.vue'
import Signup from '@/views/auth/Signup.vue'
import CreateList from '@/views/lists/CreateList.vue'
import ListDetails from '@/views/lists/ListDetails.vue'


//Route guard
import { projectAuth } from '@/firebase/config'
import MyLists from '@/views/lists/MyLists.vue'

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (!user) {
    next({ name: 'Login' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/shoppinglists/create',
    name: 'CreateList',
    component: CreateList,
    beforeEnter: requireAuth
  },
  {
    path: '/shoppinglists/:id',
    name: 'ListDetails',
    component: ListDetails,
    beforeEnter: requireAuth,
    props: true
  },
  {
    path: '/shoppinglists/user',
    name: 'MyLists',
    component: MyLists,
    beforeEnter: requireAuth,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
