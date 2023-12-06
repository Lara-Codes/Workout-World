import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import LoginView from '../views/LoginView.vue'
import { getSession } from '@/model/session';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      beforeEnter: requireLogin,
    },
    {
      path: '/activity',
      name: 'activity',
      component: () => import('../views/ActivityView.vue'),
      beforeEnter: requireLogin,
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('../views/Friends.vue'),
      beforeEnter: requireLogin,
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/Search.vue'),
      beforeEnter: requireLogin,
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/Signup.vue'),
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('../views/Stats.vue'),
      beforeEnter: requireLogin,
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductList.vue'),
      beforeEnter: requireLogin,
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UserView.vue'),
      beforeEnter: requireLogin,
    },
  ]
});

// use this spot to check if user is an admin 
function requireLogin(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const session = getSession();
  if (!session.user) {
    session.redirectUrl = to.fullPath;
    next('/');
  } else {
    next();
  }
}

export default router


