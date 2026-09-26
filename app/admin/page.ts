'use client';

import { useState, useEffect } from 'react';
import { getStudentsWithSubscriptions, toggleAppSubscription } from '@/lib/api/admin';
import { AppSubscriptionToggle } from '@/components/admin/AppSubscriptionToggle';

export default function AdminPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await getStudentsWithSubscriptions();
      if (data) {
        setStudents(data);
        if (data.length > 0) {
          setSelectedStudentId(data[0].id);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubscription = async (
    studentId: string,
    appId: string,
    currentlyActive: boolean
  ) => {
    await toggleAppSubscription(studentId, appId, currentlyActive);
    const updated = await getStudentsWithSubscriptions();
    if (updated) setStudents(updated);
  };

  const selectedStudent = students.find((s) => s.id === selectedStudentId);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-sm font-bold text-slate-600">管理画面を読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 max-w-lg mx-auto font-sans">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800">🎹 講師用管理パネル</h1>
          <p className="text-xs text-slate-500">生徒のアプリ利用権限を管理します</p>
        </div>
      </header>

      <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
        <label htmlFor="student-select" className="block text-xs font-bold text-slate-500 mb-2">
          対象の生徒を選択
        </label>
        <select
          id="student-select"
          value={selectedStudentId}
          onChange={(e) => setSelectedStudentId(e.target.value)}
          className="w-full h-12 px-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 focus:outline-none"
        >
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}（保護者: {student.parents?.display_name || '未設定'}）
            </option>
          ))}
        </select>
      </div>

      {selectedStudent && (
        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <h2 className="font-black text-slate-800 text-base mb-4 flex items-center gap-2">
            <span>👤</span> {selectedStudent.name} さんの利用可能アプリ
          </h2>

          <div className="space-y-4">
            {selectedStudent.student_app_subscriptions?.map((sub: any) => (
              <AppSubscriptionToggle
                key={sub.app_id}
                studentId={selectedStudent.id}
                appId={sub.app_id}
                appName={sub.app_id === 'rhythm' ? 'リズムあそびアプリ' : 'おんぷよみトレーニング'}
                initialIsEnabled={sub.is_enabled}
                initialExpiresAt={sub.expires_at}
                onUpdateSubscription={handleUpdateSubscription}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
