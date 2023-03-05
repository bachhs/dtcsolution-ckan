import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/HomeView.vue'),
        },
        {
            path: '/search-result',
            name: 'SearchResult',
            component: () => import('@/views/SearchResult.vue'),
        },
        {
            path: '/detail-search-result',
            name: 'DetailSearchResult',
            component: () => import('@/views/DetailSearchResult.vue'),
        },
    ],
});
export default router;
