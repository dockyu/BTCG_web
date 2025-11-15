import path from 'path'
import { loadJson } from '../utils/jsonUtils.js'
import { setCardData } from '#model'

let cardData = []
let enumMap = {}

export default async function initServer() {
  console.log('[INIT] Server initializing...')

  // 載入資料與設定
  const cardsPath = path.resolve('data/cards.json')
  const enumsPath = path.resolve('data/cardEnums.json')

  const [rawCards, enums] = await Promise.all([
    loadJson(cardsPath),
    loadJson(enumsPath)
  ])
  enumMap = enums

  // encode card data
  cardData = rawCards.map(c => encodeCard(c, enumMap))

  setCardData(cardData)
}

// 將文字欄位轉成設定檔中的代碼
function encodeCard(card, enums) {
  const encoded = { ...card }

  for (const [field, mapping] of Object.entries(enums)) {
    const value = card[field]
    if (value && mapping[value]) {
      encoded[field] = mapping[value]
    }
  }

  return encoded
}
