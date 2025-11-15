// model.js

let cardData = []


// 初始化後設定資料（只由 initServer 呼叫一次）
export function setCardData(data) {
  cardData = data
}

// 給其他模組取資料用
export function getCardData() {
  if (!cardData || cardData.length === 0) {
    throw new Error('cardData 尚未初始化')
  }
  return cardData
}