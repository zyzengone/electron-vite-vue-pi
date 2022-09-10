//@ts-nocheck
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
// import './samples/node-api'
import router from './router/index'

let app = createApp(App);
app.use(router);
app
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })

