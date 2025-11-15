<script setup>
import { ref, onMounted } from 'vue'
import CardFilter from './CardFilter.vue'

const showFilter = ref(false)
const searchText = ref('')
const filters = ref({
  card_types: [],
  support_ranges: [],
  support_value: [],
  costs: [],
  colors: [],
  ship_types: [],
  rarities: [],
  factions: [],
  camps: [],
  power_levels: []
})

// 儲存所有符合搜尋條件的卡片資訊（檔名 + 類型）
const cardDataList = ref([])

const emit = defineEmits(['left_click_card', 'right_click_card']);

function onLeftClickCard(cardFileName) {
  emit('left_click_card', cardFileName)
}

function onRightClickCard(cardData) { // 傳遞 file_name 以及 card_type
  emit('right_click_card', cardData)
}

// 通用搜尋函式（加入搜尋文字 keyword）
async function searchCards() {
  try {
    const requestBody = {
      ...filters.value,
      keyword: searchText.value?.trim() || ''
    }

    const res = await fetch('http://192.168.11.132:3000/card/cardSearch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    })

    if (!res.ok) throw new Error('網路錯誤 ' + res.status)

    const data = await res.json()
    // 假設後端回傳格式：{ cardsFileName: [ { file_name, card_types }, ... ] }
    cardDataList.value = data.cardsFileName || []
    console.log('取得卡片資訊:', cardDataList.value)
  } catch (err) {
    console.error('請求失敗：', err.message)
    cardDataList.value = []
  }
}


function openFilter() {
  showFilter.value = true
}

// 套用 filter
function applyFilter(newFilters) {
  filters.value = JSON.parse(JSON.stringify(newFilters))
  searchCards()
  closeFilter()
}

function closeFilter() {
  console.log("close")
  showFilter.value = false
}

/* 元件載入時自動搜尋 */
onMounted(() => {
  searchCards()
})
</script>

<template>
  <div>

    <keep-alive>
      <CardFilter v-if="showFilter" @apply="applyFilter" @close="closeFilter" />
    </keep-alive>

    <div style="margin-bottom: 10px;">
      <!-- @keyup.enter="searchCards" 按下Enter即執行searchCards -->
      <input v-model="searchText" type="text" @keyup.enter="searchCards">
      <button @click="searchCards" style="margin-left: 5px;">搜尋</button>
      <button @click="openFilter" style="margin-left: 5px;">篩選</button>
    </div>

    <!-- 此區塊將 所有 cardimage 顯示 ，使用固定大小遵照寶可夢卡牌比例63x88， 一排由左到右排列 -->
    <div style="display: flex; flex-wrap: wrap; row-gap: 10px; column-gap: 4px;">
      <img v-for="cardData in cardDataList" :key="cardData" :src="'http://192.168.11.132:3000/cards/' + cardData.file_name"
        :id="cardData" width="42" height="58.6"
        style="object-fit: cover; border: 1px solid #ccc; border-radius: 6px; cursor: pointer;"
        @click.left="onLeftClickCard(cardData.file_name)" @contextmenu.prevent="onRightClickCard(cardData)" />
    </div>

  </div>
</template>
