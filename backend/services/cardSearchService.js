// backend/services/cardSearchService.js
import { getCardData } from '../lifecycle/initServer.js';

/**
 * 根據篩選條件取得卡牌圖片清單
 * @param {Object} filters 篩選條件，例如 { camp, ship_type, name }
 * @returns {string[]} 符合條件的圖片名稱陣列
 */
export function getCardImages(filters = {}) {
  let result = getCardData(); // 直接使用初始化時載入的資料

  // 篩選邏輯：只有在條件有值時才篩選
  for (const [key, value] of Object.entries(filters)) {
    if (value !== null && value !== undefined && value !== '') {
      result = result.filter(card => {
        if (key === 'name') return card.name.includes(value);
        return card[key] === value;
      });
    }
  }

  // 回傳圖片名稱
  return result.map(card => card.image);
}
