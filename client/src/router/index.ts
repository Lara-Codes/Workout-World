import { createRouter, createWebHashHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getSession } from '../model/session'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/activity',
      name: 'activity',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ActivityView.vue'), 
      beforeEnter: (to, from, next) => {
        requireLogin
        next(); 
      }
    },
    {
        path: '/friends',
        name: 'friends',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/Friends.vue')
    }, 
    {
      path: '/search',
      name: 'search',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Search.vue')
  }, 
  {
    path: '/signup',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Signup.vue')
  }, 
  {
    path: '/stats',
    name: 'stats',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Stats.vue')
  }, 
  {
    path: '/products',
    name: 'products',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/ProductList.vue')
  }
  ]
});

// use this spot to check if user is an admin 
function requireLogin(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const session = getSession(); 
  if(!session.user){
    session.redirectUrl = to.fullPath; 
    next('/login')
  } else{
    next()
  }
}


export default router
