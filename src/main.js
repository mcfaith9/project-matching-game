import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import App from '@/App.vue'
import '@/assets/css/custom.css'

library.add(fas)

createApp(App).component('fa', FontAwesomeIcon).mount('#app')
