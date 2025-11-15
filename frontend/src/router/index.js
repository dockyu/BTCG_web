import { createRouter, createWebHistory } from 'vue-router'
/* 頁面 */
import HomePage from '../views/HomePage.vue'
import TestPage from '../views/TestPage.vue'
import GetApiTestPage from '../views/GetApiTestPage.vue'
import DeckBuildPage from '../views/DeckBuildPage.vue'
import CardSearchSendTestPage from '../views/CardSearchSendTestPage.vue'
import CardSearchTestPage from '../views/CardSearchTestPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/test', component: TestPage },
  { path: '/getapitest', component: GetApiTestPage },
  { path: '/deckbuild', component: DeckBuildPage },
  { path: '/CardSearchSendTestPage', component: CardSearchSendTestPage },
  { path: '/CardSearchTestPage', component: CardSearchTestPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
