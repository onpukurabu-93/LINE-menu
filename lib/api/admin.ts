import { supabase } from '../supabase';

export async function getStudentsWithSubscriptions() {
  try {
    const { data: students, error: studentsError } = await supabase
      .from('students')
      .select(`
        *,
        parents (
          display_name
        ),
        student_app_subscriptions (
          app_id,
          is_enabled,
          expires_at
        )
      `);

    if (studentsError) {
      console.error('Error fetching students with subscriptions:', studentsError);
      return [];
    }

    return students || [];
  } catch (error) {
    console.error('getStudentsWithSubscriptions exception:', error);
    return [];
  }
}

export async function toggleAppSubscription(
  studentId: string,
  appId: string,
  currentlyActive: boolean
) {
  try {
    const nextState = !currentlyActive;
    const expiresAt = nextState
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      : null;

    const { error } = await supabase
      .from('student_app_subscriptions')
      .upsert(
        {
          student_id: studentId,
          app_id: appId,
          is_enabled: nextState,
          expires_at: expiresAt,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'student_id,app_id' }
      );

    if (error) {
      console.error('Error toggling subscription:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('toggleAppSubscription exception:', error);
    return false;
  }
}
