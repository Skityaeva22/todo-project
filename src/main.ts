import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import ru from 'element-plus/es/locale/lang/ru'

import '@/assets/tailwind/base.postcss'
import '@/assets/index.scss'
import 'element-plus/dist/index.css'
import '@/assets/tailwind/index.postcss'

import { createVfm } from 'vue-final-modal'
import { createPinia } from 'pinia'

import 'vue-final-modal/style.css'

import App from '@/app'
import router from '@/providers'

const app = createApp(App)

app
  .use(createPinia())
  .use(createVfm())
  .use(router)
  .use(ElementPlus, { locale: ru })

for (const [key, component] of Object.entries(ElementPlusIconsVue))
  app.component(key, component)

app.mount('#app')
