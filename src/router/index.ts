import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/products/ProductView.vue'
import ProductsView from '../views/products/ProductsView.vue'
import LoginView from '../views/auth/LoginView.vue'
import DefaultLayout from '../layout/DefaultLayout.vue'
import AuthLayout from '../layout/AuthLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    component: DefaultLayout,
    children: [
      { path: '/home', name: 'home', component: HomeView },
      { path: '/products', name: 'products', component: ProductsView },
      {
        path: '/products/edit',
        name: 'products-edit',
        component: ProductsView,
      },
      { path: '/product/:id', name: 'product', component: ProductView },
    ],
  },
  {
    path: '/auth',
    redirect: '/login',
    name: 'auth',
    component: AuthLayout,
    meta: { isGuest: true },
    children: [{ path: '/login', name: 'login', component: LoginView }],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
