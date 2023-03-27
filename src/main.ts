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
import AutoComplete from 'primevue/autocomplete'
import Inplace from 'primevue/inplace'
import Dialog from 'primevue/dialog'
import Skeleton from 'primevue/skeleton'
import InputNumber from 'primevue/inputnumber'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(PrimeVue)
app.use(ToastService)

app.component('Menubar', Menubar)
app.component('Card', Card)
app.component('InputText', InputText)
app.component('InputNumber', InputNumber)
app.component('Button', Button)
app.component('Tag', Tag)
app.component('AutoComplete', AutoComplete)
app.component('Inplace', Inplace)
app.component('Dialog', Dialog)
app.component('Skeleton', Skeleton)
app.component('Toast', Toast)

app.mount('#app')
