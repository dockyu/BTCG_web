<script setup>
import { ref } from 'vue'

const responseData = ref(null)

async function sendEmptyFilter() {
  try {
    const res = await fetch('http://192.168.11.132:3000/card/cardSearch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) // 空的 filter
    })

    if (!res.ok) throw new Error('網路錯誤 ' + res.status)

    const data = await res.json()
    responseData.value = JSON.stringify(data, null, 2)
  } catch (err) {
    responseData.value = '❌ 請求失敗：' + err.message
  }
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Post 空的 filter 測試</h1>
    <button @click="sendEmptyFilter" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      送出空 filter
    </button>

    <div v-if="responseData" class="mt-4">
      <h2 class="font-semibold">回傳結果:</h2>
      <pre>{{ responseData }}</pre>
    </div>
  </div>
</template>
