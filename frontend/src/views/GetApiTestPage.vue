<script setup>
import { ref, onMounted } from 'vue'

// 儲存請求結果與載入狀態
const result = ref('')
const loading = ref(true)

onMounted(async () => {
  try {
    // 嘗試向後端 API 發送 GET 請求
    const response = await fetch('http://192.168.11.132:3000/api/test')
    const data = await response.json()
    result.value = JSON.stringify(data, null, 2)
  } catch (error) {
    result.value = '❌ 請求失敗：' + error
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <h1>Get API Test Page</h1>

    <div v-if="loading">正在向後端請求資料...</div>
    <div v-else>
      <p>後端回應：</p>
      <pre>{{ result }}</pre>
    </div>
  </div>
</template>

