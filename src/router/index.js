import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import store from '@/store';

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/pages/Login.vue')
    },
    {
        path: '/dashboard',
        component: AppLayout,
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('../views/pages/menu/Home.vue')
            },
            {
                path: '/rooms',
                name: 'rooms',
                component: () => import('../views/pages/menu/Rooms.vue')
            },
            {
                path: '/tenants',
                name: 'tenants',
                component: () => import('../views/pages/menu/Tenants.vue')
            },
            {
                path: '/guests',
                name: 'guests',
                component: () => import('../views/pages/menu/Guests.vue')
            },
            {
                path: '/waterBillingPayment',
                name: 'waterBillingPayment',
                component: () => import('../views/pages/menu/WaterBillingPayment.vue')
            },
            {
                path: '/electricityBillingPayment',
                name: 'electricityBillingPayment',
                component: () => import('../views/pages/menu/ElectricityBillingPayment.vue')
            },
            {
                path: '/reports',
                name: 'reports',
                component: () => import('../views/pages/menu/Reports.vue')
            },
            {
                path: '/changePassword',
                name: 'changePassword',
                component: () => import('../views/pages/user-settings/ChangePassword.vue')
            }
        ]
    },
    {
        path: '/:catchAll(.*)',
        name: 'notFound',
        component: () => import('../views/pages/NotFound.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach( async (to, from, next) => {
    await store.dispatch('authModule/checkAuth');
    const isAuthenticated = store.getters['authModule/isAuthenticated'];
    if (to.name !== 'login' && !isAuthenticated) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router