<script setup>
import { ref } from 'vue'

const emit = defineEmits(['left_click_card', 'right_click_card']);

// 維護卡片清單
const cardList = ref([])
const deckCardList = ref([]) // 儲存已加入牌組的卡片
const flagShipList = ref([]) // 儲存已加入的旗艦卡

// 暴露給父元件使用
defineExpose({ addCard })

/*
 * 子元件的函式（讓父元件呼叫）
 * 將卡片加入牌組區塊，
 * 分成 [旗艦卡] 以及 [艦船卡、事件卡] 處理
 */
function addCard(newCardFileName, newCardType) {
  // 區分旗艦卡與牌組內容
  if (newCardType == 1 || newCardType == 2) { // 旗艦
    // 若已有此旗艦，則不再加入
    if (flagShipList.value.includes(newCardFileName))
      return

    // 加入旗艦
    flagShipList.value.push(newCardFileName)
    flagShipList.value.sort()
  } else if (newCardType == 3 || newCardType == 4) { // 旗艦以外
    // 計算目前這張卡出現的次數
    const count = deckCardList.value.filter(name => name === newCardFileName).length

    // 若已達 4 張，則不再加入
    if (count >= 4) {
      return
    }

    // 加入卡片
    deckCardList.value.push(newCardFileName)
    deckCardList.value.sort()
  }
}

function onLeftClickCard(cardFileName) {
  emit('left_click_card', cardFileName)
}

/*
 * 移除旗艦
 */
function onRightClickFlagship(flagShipFileName) {
  // 找出該卡的索引位置
  const index = flagShipList.value.indexOf(flagShipFileName)

  // 若存在則移除
  if (index !== -1)
    flagShipList.value.splice(index, 1)
}

/*
 * 移除牌組內的卡
 */
function onRightClickDeckCard(deckCardFileName) {
  // 找出該卡的索引位置
  const index = deckCardList.value.indexOf(deckCardFileName)

  // 若存在則移除
  if (index !== -1)
    deckCardList.value.splice(index, 1)
}

</script>

<template>
  <div>

    <h3 style="text-align: center; margin: 4px 0;">旗艦</h3>
    <!-- 旗艦區（置中，保留空間） -->
    <div style="
    display: flex; 
    justify-content: center; 
    flex-wrap: wrap; 
    row-gap: 10px; 
    column-gap: 4px; 
    min-height: 60px; /* 最小高度保留空位 */
    margin-bottom: 10px; /* 元素底部與下一個元素之間的外部間距 */
    /*border: 1px dashed #ddd; /* 可選：顯示空間邊界，方便視覺 */
  ">
      <img v-for="fileName in flagShipList" :key="fileName" :src="'http://192.168.11.132:3000/cards/' + fileName"
        :id="fileName" width="42" height="58.6"
        style="object-fit: cover; border: 1px solid #ccc; border-radius: 6px; cursor: pointer;"
        @click.left="onLeftClickCard(fileName)" @contextmenu.prevent="onRightClickFlagship(fileName)" />
    </div>

    <h3 style="text-align: center; margin: 4px 0;">牌組</h3>
    <!-- 牌組區（由左到右） -->
    <div style="display: flex; flex-wrap: wrap; row-gap: 10px; column-gap: 4px;">
      <img v-for="fileName in deckCardList" :key="fileName" :src="'http://192.168.11.132:3000/cards/' + fileName"
        :id="fileName" width="42" height="58.6"
        style="object-fit: cover; border: 1px solid #ccc; border-radius: 6px; cursor: pointer;"
        @click.left="onLeftClickCard(fileName)" @contextmenu.prevent="onRightClickDeckCard(fileName)" />
    </div>

  </div>
</template>
