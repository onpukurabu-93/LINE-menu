/**
 * 現在日時から「翌月末 23:59:59.999」のISO文字列を生成する関数
 * 例: 2026年9月15日に実行 ➔ 2026年10月31日 23:59:59.999
 */
export function getEndOfNextMonthISO(): string {
  const now = new Date();
  
  // 翌々月の「0日目」を指定することで、翌月の末日を取得できます
  const nextMonthEnd = new Date(
    now.getFullYear(),
    now.getMonth() + 2, // 翌々月
    0,                  // 翌月末日
    23, 59, 59, 999
  );
  
  return nextMonthEnd.toISOString();
}
