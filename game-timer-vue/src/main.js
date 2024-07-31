import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'element-plus/dist/index.css'
const app = createApp(App)
import 'cirrus-ui';
import VueClock from '@dangvanthanh/vue-clock'

app.use(axios)
app.use(VueClock)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
