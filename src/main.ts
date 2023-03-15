/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import store from './store'
// primeVue
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.css'
import 'primeicons/primeicons.css'
// primeVue Component
import Menubar from 'primevue/menubar'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(PrimeVue)

app.component('Menubar', Menubar)
app.component('Card', Card)
app.component('InputText', InputText)
app.component('Button', Button)
app.component('Tag', Tag)

app.mount('#app')
