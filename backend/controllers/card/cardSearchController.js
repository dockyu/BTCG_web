import { getCardData } from '#model';


export async function main(req, res) {
  try {
    const filters = req.body || {};
    const cardsFileName = getCardFileName(filters);

    res.json({ cardsFileName });
  } catch (error) {
    console.error('[ERROR] cardSearchController:', error);
    res.status(500).json({ error: 'Failed to search cards' });
  }
}

/**
 * 根據前端 filter 取得卡牌圖片檔名
 * @param {Object} filters 前端傳來的 filter
 * @returns {string[]} 符合條件的卡片檔名
 */
function getCardFileName(filters = {}) {
  let json = getCardData(); // ← 取得卡片 JSON
  const keyword = filters.keyword?.trim(); // ← 取得關鍵字（若無則為 undefined）

  // 先移除 keyword
  delete filters.keyword;

  for (const [key, value] of Object.entries(filters)) {
    if (!value || (Array.isArray(value) && value.length === 0)) continue;

    json = json.filter(card => {
      const cardVal = card[key];

      if (key === 'name') {
        // 名稱部分比對
        return cardVal && cardVal.includes(value);
      }

      if (Array.isArray(value)) {
        // checkbox 篩選 → 任一符合即可
        return value.includes(cardVal);
      }

      // 單值比對
      return cardVal === value;
    });
  }

  // 關鍵字搜尋
  if (keyword && keyword.length > 0) {
    json = json.filter(card => {
      // 模糊比對：名稱或描述中包含 keyword 即保留
      return (
        (card.name && card.name.includes(keyword)) || // 卡名包含 keyword
        (card.description && card.description.includes(keyword)) // 卡片敘述包含 keyword
      );
    });
  }

  // 回傳符合條件的檔名與卡片類型
  return json.map(card => ({
    file_name: card.file_name,
    card_types: card.card_types // [旗艦卡,旗艦卡(覺醒),艦船卡,事件卡]
  }));
}