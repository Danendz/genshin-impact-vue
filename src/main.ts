import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueLazyLoad from 'vue3-lazyload'

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

createApp(App).use(VueLazyLoad).use(pinia).use(router).mount('#app')
