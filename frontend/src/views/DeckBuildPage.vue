<!-- src/views/DeckBuildPage.vue -->
<script setup>
import CardDetail from '../components/CardDetail.vue'
import DeckCard from '../components/DeckCard.vue'
import CardList from '../components/CardList.vue'

import { ref } from 'vue';

// 建立 ref 來綁定子元件
const deckCardRef = ref(null)
const cardDetailRef = ref(null)

// 套用 filter
function applyLeftClickCard(newFileName) {
  cardDetailRef.value.showCard(newFileName)
  // leftClickCardFileName.value = newFileName
}

// 通知 DeckCard.vue 加入新的卡 filename 是 newFileName
function applyRightClickCard(cardData) {
  deckCardRef.value.addCard(cardData.file_name, cardData.card_types)
}

</script>

<template>
  <div class="deck-build-container" style="display: flex; width: 100%; height: 100vh;">
    <!-- 左：卡片詳細資訊 -->
    <div style="flex: 7; border: 1px solid gray; padding: 10px;">
      <CardDetail ref="cardDetailRef" />
    </div>

    <!-- 中：目前組成的牌組 -->
    <div style="flex: 17; border: 1px solid gray; padding: 10px;">
      <DeckCard ref="deckCardRef" @left_click_card="applyLeftClickCard" />
    </div>

    <!-- 右：可選卡片列表 -->
    <div style="flex: 10; border: 1px solid gray; padding: 10px;">
      <CardList @left_click_card="applyLeftClickCard" @right_click_card="applyRightClickCard" />
    </div>
  </div>
</template>
