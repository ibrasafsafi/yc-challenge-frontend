import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/AdminView.vue'),
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
    },

    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue'),
    },

    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),

      children: [
        {
          path: 'products',
          name: 'products',
          component: () => import('../views/products/ProductsView.vue'),

          children: [
            {
              path: '',
              name: 'products.index',
              component: () => import('../views/products/ProductsIndex.vue'),
            },

            {
              path: 'create',
              name: 'products.create',
              component: () => import('../views/products/CreateProduct.vue'),
            },

            {
              path: ':id/edit',
              name: 'products.edit',
              props: true,
              component: () => import('../views/products/EditProduct.vue'),
            },
          ],
        },
      ],
    },
  ],
});

export default router;
