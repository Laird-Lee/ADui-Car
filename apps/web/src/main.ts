import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import i18n from '@/lang';
import { useRequest } from '@/hooks';

const app = createApp(App);
const { loading, debouncedRequest } = useRequest();
app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount('#app');
