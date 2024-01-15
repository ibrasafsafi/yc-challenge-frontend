import { createApp } from 'vue';
import { createPinia } from 'pinia';
import AxiosPlugin from './boot/api.js';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(AxiosPlugin);

app.mount('#app');
