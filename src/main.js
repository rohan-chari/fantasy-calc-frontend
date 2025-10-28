import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// Create Vue app instance
const app = createApp(App)

// Use router
app.use(router)

// Mount the app to the DOM
app.mount('#app')
