<script setup>
import { ref } from 'vue'

// 儲存打勾的篩選條件
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

/* 向 CardList emit */
const emit = defineEmits(['apply', 'close'])

/* 通知 CardLlist 應用篩選，並傳遞新的篩選條件 */
function onApplyClick() {
  emit('apply', filters.value)
}

/* 通知 CardLlist 關閉 CardFilter */
function onCloseClick() {
  emit('close')
}

/* 重設篩選 */
function onResetClick() {
  filters.value = {
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
  }
}
</script>

<template>
  <div style="
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.7); display: flex; justify-content: center; align-items: center;
    ">
    <div style="
        background: white; width: 90%; height: 90%; overflow-y: auto;
        padding: 20px; border-radius: 10px;
      ">
      <div style="display: flex; flex-direction: column; gap: 15px;">
        <!-- 卡片種類 -->
        <div style="display: flex; align-items: center; gap: 10px;">
          <label style="white-space: nowrap;">卡片種類：</label>
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">            
            <input type="checkbox" :value="1" v-model="filters.card_types" /> 旗艦卡
            <input type="checkbox" :value="2" v-model="filters.card_types" /> 旗艦卡(覺醒)
            <input type="checkbox" :value="3" v-model="filters.card_types" /> 艦船卡
            <input type="checkbox" :value="4" v-model="filters.card_types" /> 事件卡
          </div>
        </div>

        <!-- 顏色 -->
        <div style="display: flex; align-items: center; gap: 10px;">
          <label style="white-space: nowrap;">顏色：</label>
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            <input type="checkbox" :value="1" v-model="filters.colors" /> 紅
            <input type="checkbox" :value="2" v-model="filters.colors" /> 藍
            <input type="checkbox" :value="3" v-model="filters.colors" /> 黃
            <input type="checkbox" :value="4" v-model="filters.colors" /> 黑
            <input type="checkbox" :value="5" v-model="filters.colors" /> 無
            <input type="checkbox" :value="6" v-model="filters.colors" /> 紅藍
            <input type="checkbox" :value="7" v-model="filters.colors" /> 紅黃
            <input type="checkbox" :value="8" v-model="filters.colors" /> 紅黑
            <input type="checkbox" :value="9" v-model="filters.colors" /> 藍黃
            <input type="checkbox" :value="10" v-model="filters.colors" /> 藍黑
            <input type="checkbox" :value="11" v-model="filters.colors" /> 黃黑
          </div>
        </div>

        <!-- 支援範圍 -->
        <div style="display: flex; align-items: center; gap: 10px;">
          <label style="white-space: nowrap;">支援範圍：</label>
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            <input type="checkbox" :value="1" v-model="filters.support_ranges" /> 手牌
            <input type="checkbox" :value="2" v-model="filters.support_ranges" /> 戰場
            <input type="checkbox" :value="3" v-model="filters.support_ranges" /> 手牌·戰場
          </div>
        </div>

        <!-- 支援值 -->
        <div style="display: flex; align-items: center; gap: 10px;">
          <label style="white-space: nowrap;">支援值：</label>
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            <input type="checkbox" :value="0" v-model="filters.support_value" /> 0
            <input type="checkbox" :value="100" v-model="filters.support_value" /> 100
            <input type="checkbox" :value="200" v-model="filters.support_value" /> 200
          </div>
        </div>

        <!-- 罕貴 -->
        <div style="display: flex; align-items: center; gap: 10px;">
          <label style="white-space: nowrap;">罕貴：</label>
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            <input type="checkbox" :value="1" v-model="filters.rarities" /> N
            <input type="checkbox" :value="2" v-model="filters.rarities" /> R
            <input type="checkbox" :value="3" v-model="filters.rarities" /> SR
            <input type="checkbox" :value="4" v-model="filters.rarities" /> SSR
            <input type="checkbox" :value="5" v-model="filters.rarities" /> UR
            <input type="checkbox" :value="6" v-model="filters.rarities" /> L
            <input type="checkbox" :value="7" v-model="filters.rarities" /> SR-SEC
            <input type="checkbox" :value="8" v-model="filters.rarities" /> SSR-SEC
            <input type="checkbox" :value="9" v-model="filters.rarities" /> UR-SEC
            <input type="checkbox" :value="10" v-model="filters.rarities" /> L-SEC
            <input type="checkbox" :value="11" v-model="filters.rarities" /> PR
            <input type="checkbox" :value="12" v-model="filters.rarities" /> N-SEC
            <input type="checkbox" :value="13" v-model="filters.rarities" /> SPR
            <input type="checkbox" :value="14" v-model="filters.rarities" /> L-PR
          </div>
        </div>

        <!-- 勢力 -->
        <div style="display: flex; align-items: center; gap: 10px;">
          <label style="white-space: nowrap;">勢力：</label>
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            <input type="checkbox" :value="1" v-model="filters.factions" /> 赤色中軸
            <input type="checkbox" :value="2" v-model="filters.factions" /> 碧藍航線
          </div>
        </div>

        <!-- 陣營 -->
        <div style="display: flex; align-items: center; gap: 10px;">
          <label style="white-space: nowrap;">陣營：</label>
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            <input type="checkbox" :value="1" v-model="filters.camps" /> 鐵血
            <input type="checkbox" :value="2" v-model="filters.camps" /> 皇家
            <input type="checkbox" :value="3" v-model="filters.camps" /> 重櫻
            <input type="checkbox" :value="4" v-model="filters.camps" /> 白鷹
            <input type="checkbox" :value="5" v-model="filters.camps" /> 自由鳶尾
            <input type="checkbox" :value="6" v-model="filters.camps" /> 維希教廷
            <input type="checkbox" :value="7" v-model="filters.camps" /> 東煌
            <input type="checkbox" :value="8" v-model="filters.camps" /> 薩丁帝國
            <input type="checkbox" :value="9" v-model="filters.camps" /> 北方聯合
            <input type="checkbox" :value="10" v-model="filters.camps" /> 颶風
          </div>
        </div>

        <!-- 艦船類型 -->
        <div style="display: flex; align-items: center; gap: 10px;">
          <label style="white-space: nowrap;">艦船類型：</label>
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            <input type="checkbox" :value="1" v-model="filters.ship_types" /> 驅逐
            <input type="checkbox" :value="2" v-model="filters.ship_types" /> 戰巡
            <input type="checkbox" :value="3" v-model="filters.ship_types" /> 輕巡
            <input type="checkbox" :value="4" v-model="filters.ship_types" /> 重巡
            <input type="checkbox" :value="5" v-model="filters.ship_types" /> 輕航
            <input type="checkbox" :value="6" v-model="filters.ship_types" /> 航母
            <input type="checkbox" :value="7" v-model="filters.ship_types" /> 潛艇
            <input type="checkbox" :value="8" v-model="filters.ship_types" /> 戰列
            <input type="checkbox" :value="9" v-model="filters.ship_types" /> 維修
            <input type="checkbox" :value="10" v-model="filters.ship_types" /> 潛母
            <input type="checkbox" :value="11" v-model="filters.ship_types" /> 超巡
            <input type="checkbox" :value="12" v-model="filters.ship_types" /> 航戰
            <input type="checkbox" :value="13" v-model="filters.ship_types" /> 運輸
            <input type="checkbox" :value="14" v-model="filters.ship_types" /> 風帆
          </div>
        </div>

        <!-- 費用 -->
        <div style="display: flex; align-items: center; gap: 10px;">
          <label style="white-space: nowrap;">費用：</label>
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            <input type="checkbox" :value="0" v-model="filters.costs" /> 0
            <input type="checkbox" :value="1" v-model="filters.costs" /> 1
            <input type="checkbox" :value="2" v-model="filters.costs" /> 2
            <input type="checkbox" :value="3" v-model="filters.costs" /> 3
            <input type="checkbox" :value="4" v-model="filters.costs" /> 4
            <input type="checkbox" :value="5" v-model="filters.costs" /> 5
            <input type="checkbox" :value="6" v-model="filters.costs" /> 6
            <input type="checkbox" :value="7" v-model="filters.costs" /> 7
            <input type="checkbox" :value="8" v-model="filters.costs" /> 8
            <input type="checkbox" :value="9" v-model="filters.costs" /> 9
            <input type="checkbox" :value="10" v-model="filters.costs" /> 10
          </div>
        </div>

        <!-- 戰力 -->
        <div style="display: flex; align-items: center; gap: 10px;">
          <label style="white-space: nowrap;">戰力：</label>
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            <input type="checkbox" :value="100" v-model="filters.power_levels" /> 100
            <input type="checkbox" :value="200" v-model="filters.power_levels" /> 200
            <input type="checkbox" :value="300" v-model="filters.power_levels" /> 300
            <input type="checkbox" :value="400" v-model="filters.power_levels" /> 400
            <input type="checkbox" :value="500" v-model="filters.power_levels" /> 500
            <input type="checkbox" :value="600" v-model="filters.power_levels" /> 600
            <input type="checkbox" :value="700" v-model="filters.power_levels" /> 700
            <input type="checkbox" :value="800" v-model="filters.power_levels" /> 800
            <input type="checkbox" :value="900" v-model="filters.power_levels" /> 900
            <input type="checkbox" :value="1000" v-model="filters.power_levels" /> 1000
          </div>
        </div>
      </div>

      <!-- 按鈕區塊 -->
      <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px;">
        <button type="button" @click="onCloseClick">
          取消
        </button>

        <button type="button" @click="onResetClick">
          重設
        </button>

        <button type="button" @click="onApplyClick">
          套用
        </button>
      </div>
    </div>
  </div>
</template>