import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { store } from './store'
import { apolloClient } from './apolloClient'

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})
  .use(store)
  .use(router)
  .mount('#app')
