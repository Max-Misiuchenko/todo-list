import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';

import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import '@/assets/styles/main.css';

import App from './App.vue';
import router from './router';

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount('#app');
