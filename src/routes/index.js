import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        { path: '/', name: 'root', component: App },
    ],
});

export default router;