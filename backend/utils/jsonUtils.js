import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 讀取 JSON 檔案
 * @param {string} filePath 相對或絕對路徑
 */
export async function loadJson(filePath) {
  // 判斷是否為絕對路徑
  const fullPath = path.isAbsolute(filePath)
    ? filePath
    : path.join(__dirname, filePath); // 相對路徑才 join __dirname

  const data = await readFile(fullPath, 'utf-8');
  return JSON.parse(data);
}
