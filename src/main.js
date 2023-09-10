import { createApp } from 'vue';

import router from './router.js';
import store from './store/index.js';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import BaseDialog from './components/ui/BaseDialog.vue';

import App from './App.vue';

const app = createApp(App)

app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('base-badge', BaseBadge);
app.component('BaseSpinner', BaseSpinner);
app.component('BaseDialog', BaseDialog);

app.use(router);
app.use(store);

app.mount('#app');