import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './stores'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
// 权限控制
import './permission'
import './styles/index.scss'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(ArcoVueIcon)

app.mount('#app')
