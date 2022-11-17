import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueLazyLoad from 'vue3-lazyload'
import i18n from './i18n/i18n'

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

createApp(App)
	.use(i18n)
	.use(VueLazyLoad)
	.use(pinia)
	.use(router)
	.mount('#app')
