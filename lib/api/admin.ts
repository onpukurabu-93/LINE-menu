import { supabase } from '../supabaseClient';
import { getEndOfNextMonthISO } from '@/utils/date';

/**
 * 全生徒とそれぞれのアプリ利用権限データを取得する
 */
export async function getStudentsWithSubscriptions() {
  const { data, error } = await supabase
    .from('students')
    .select(`
      id,
      name,
      level,
      parents ( display_name ),
      student_app_subscriptions (
        app_id,
        is_enabled,
        expires_at
      )
    `);

  if (error) {
    console.error('生徒データの取得に失敗しました:', error);
    throw error;
  }
  return data;
}

/**
 * 対象生徒のアプリ権限をON/OFF更新する
 * - OFFにする場合: is_enabled = false
 * - ONにする場合 : is_enabled = true かつ expires_at に「翌月末」をセット
 */
export async function toggleAppSubscription(
  studentId: string,
  appId: string,
  currentlyActive: boolean
) {
  if (currentlyActive) {
    // 現在ON ➔ OFFに更新
    const { error } = await supabase
      .from('student_app_subscriptions')
      .upsert(
        {
          student_id: studentId,
          app_id: appId,
          is_enabled: false,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'student_id,app_id' }
      );

    if (error) throw error;
  } else {
    // 現在OFF ➔ 翌月末までONに更新
    const nextMonthEnd = getEndOfNextMonthISO();

    const { error } = await supabase
      .from('student_app_subscriptions')
      .upsert(
        {
          student_id: studentId,
          app_id: appId,
          is_enabled: true,
          expires_at: nextMonthEnd,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'student_id,app_id' }
      );

    if (error) throw error;
  }
}
