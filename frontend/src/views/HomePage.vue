<script setup>
// 不需邏輯，純導航
</script>

<template>
  <div>
    <h1>導航頁面</h1>
    <ul>
      <li><router-link to="/test">前往 Test Page</router-link></li>
      <li><router-link to="/getapitest">前往 GetApiTest Page</router-link></li>
      <li><router-link to="/cardsearchsendtestpage">前往 CardSearchSendTestPage Page</router-link></li>
      <li><router-link to="/cardsearchtestpage">前往 CardSearchTestPage Page</router-link></li>
      <li><router-link to="/deckbuild">前往 DeckBuild Page</router-link></li>
    </ul>
  </div>
</template>
