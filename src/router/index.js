import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/frontend/User.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/frontend/Home.vue'),
        meta: {
          hideFooter: true,
        },
      },
      {
        path: 'products',
        name: '所有產品',
        component: () => import('../views/frontend/Products.vue'),

      },
      {
        path: 'product/:productId',
        name: '單一產品',
        component: () => import('../views/frontend/Product.vue'),
      },
      {
        path: 'comparison',
        name: '車款比較',
        component: () => import('../views/frontend/Comparison.vue'),
      },
      {
        path: 'articles',
        name: '文章總覽',
        component: () => import('../views/frontend/Articles.vue'),
      },
      {
        path: 'article/:articleId',
        name: '單一文章',
        component: () => import('../views/frontend/Article.vue'),
      },
      {
        path: 'search',
        name: '搜尋',
        component: () => import('../views/frontend/Search.vue'),
        meta: {
          hideComponent: true,
        },
      },
      {
        path: 'cart',
        name: '購物車',
        component: () => import('../views/frontend/Cart.vue'),
      },
      {
        path: 'checkout',
        name: '訂單填寫',
        component: () => import('../views/frontend/Checkout.vue'),
        meta: {
          hideComponent: true,
        },
      },
      {
        path: 'order/:orderId',
        name: '訂單確認',
        component: () => import('../views/frontend/Order.vue'),
        meta: {
          hideComponent: true,
        },
      },
    ],
  },
  {
    path: '/r',
    name: '登入',
    component: () => import('../views/backend/Login.vue'),
  },
  {
    path: '/dashboard',
    name: '後台',
    component: () => import('../views/backend/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: '產品',
        component: () => import('../views/backend/Products.vue'),
      },
      {
        path: 'orders',
        name: '訂單',
        component: () => import('../views/backend/Orders.vue'),
      },
      {
        path: 'coupons',
        name: '優惠券',
        component: () => import('../views/backend/Coupons.vue'),
      },
      {
        path: 'articles',
        name: '文章',
        component: () => import('../views/backend/Articles.vue'),
      },
    ],
  },
  {
    path: '/:pathMath(.*)*',
    name: '404',
    component: () => import('../views/frontend/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/dashboard')) {
    document.body.style.backgroundColor = '#e7e6e6';
    router.options.linkActiveClass = 'active-nav-item';
  } else if (to.path === '/r') {
    document.body.style.backgroundColor = '#e7e6e6';
  } else {
    document.body.style.backgroundColor = '';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  next();
});

export default router;
