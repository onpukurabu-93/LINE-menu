import { supabase } from '../supabase';

export async function getParentAndStudents(parentId: string) {
  try {
    const { data: parent, error: parentError } = await supabase
      .from('parents')
      .select('*')
      .eq('id', parentId)
      .single();

    if (parentError && parentError.code !== 'PGRST116') {
      console.error('Error fetching parent:', parentError);
    }

    const { data: students, error: studentsError } = await supabase
      .from('students')
      .select('*')
      .eq('parent_id', parentId);

    if (studentsError) {
      console.error('Error fetching students:', studentsError);
    }

    return {
      parent: parent || null,
      students: students || [],
    };
  } catch (error) {
    console.error('getParentAndStudents exception:', error);
    return { parent: null, students: [] };
  }
}

export async function verifyParentPin(parentId: string, pin: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('parents')
      .select('pin_code')
      .eq('id', parentId)
      .single();

    if (error || !data) return false;
    return data.pin_code === pin;
  } catch (error) {
    console.error('verifyParentPin exception:', error);
    return false;
  }
}
