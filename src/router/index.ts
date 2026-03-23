import { createRouter, createWebHistory } from 'vue-router';

import type { RouteRecordRaw } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'main',
          component: () => import('@/pages/MainPage.vue'),
          meta: {
            label: 'Главная',
          },
        },
      ],
    },
  ],
});

router.beforeEach((to: RouteRecordRaw) => {
  document.title = to.meta.label ?? 'Todo List';
});

export default router;
