// routes/card/describeSearch.js
import { getCardData } from '#model';

export async function main(req, res) {
  try {
    // 從請求中取得前端傳來的 cardFileName
    const { cardFileName } = req.body;

    if (!cardFileName) {
      return res.status(400).json({ error: '缺少 cardFileName 參數' });
    }

    // 同步取得卡片 JSON 資料
    let json = getCardData();

    // 在 json 陣列中尋找 file_name 與 cardFileName 相符的卡片
    const card = json.find(c => c.file_name === cardFileName);

    if (!card) {
      return res.status(404).json({ describe: '查無此卡' });
    }

    // 成功找到卡片，回傳卡片描述內容
    return res.json({ describe: card.description || '（無描述資料）' });

  } catch (error) {
    console.error('cardSearch 錯誤：', error);
    return res.status(500).json({ error: '伺服器內部錯誤' });
  }
}
