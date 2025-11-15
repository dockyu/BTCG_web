<script setup>
import { defineProps, ref, watch, onMounted } from 'vue'

// 暴露給父元件使用
defineExpose({ showCard })

const showCardFileName = ref('')
// 儲存卡片描述文字
const cardDescribe = ref('')

// 子元件的函式（讓父元件呼叫）
function showCard(newFileName) {
  console.log(newFileName)
  showCardFileName.value = newFileName
  fetchCardDescribe(newFileName)
}

// 從後端取得卡片描述資料
async function fetchCardDescribe(filename) {
  try {
    const response = await fetch('http://192.168.11.132:3000/card/describeSearch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cardFileName: filename })
    })

    if (!response.ok) throw new Error('HTTP 錯誤 ' + response.status)

    const data = await response.json()
    // 假設回傳格式為 { describe: '卡片說明文字' }
    cardDescribe.value = data.describe || '（無描述資料）'
  } catch (error) {
    console.error('取得卡片描述失敗：', error)
    cardDescribe.value = '（無法取得描述）'
  }
}
</script>

<template>
  <div style="
      height: 100%;
      box-sizing: border-box;
      overflow-y: auto;        /* 僅此區塊內部可滾動 */
      overflow-x: hidden;      /* 禁止水平捲動 */
    ">

    <!-- 顯示卡片圖片 -->
    <img v-if="showCardFileName !== ''" :src="'http://192.168.11.132:3000/cards/' + showCardFileName" alt="Card Image"
      style="
      width: 202px;
      height: 282px;
      object-fit: contain;
      display: block;
      margin-bottom: 8px;
    " />

    <!-- 顯示卡片描述 -->
    <div style="white-space: pre-line;">{{ cardDescribe }}</div>
  </div>
</template>
