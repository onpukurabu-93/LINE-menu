'use client';

import { useState, useEffect } from 'react';
import { fetchAdminStudents, toggleAppSubscription } from '@/lib/api/admin';
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
    const data = await fetchAdminStudents();
    setStudents(data);
    if (data.length > 0) {
      setSelectedStudentId(data[0].id);
    }
    setLoading(false);
  };

  const handleUpdateSubscription = async (
    studentId: string,
    appId: string,
    currentlyActive: boolean
  ) => {
    await toggleAppSubscription(studentId, appId, currentlyActive);
    // 更新後に最新データを再取得
    const updated = await fetchAdminStudents();
    setStudents(updated);
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
          <p className="text-xs text-slate-500">生徒のアプリ利用権限（翌月末まで）を管理します</p>
        </div>
      </header>

      {/* 生徒選択ドロップダウン */}
      <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
        <label htmlFor="student-select" className="block text-xs font-bold text-slate-500 mb-2">
          対象の生徒を選択
        </label>
        <select
          id="student-select"
          value={selectedStudentId}
          onChange={(e) => setSelectedStudentId(e.target.value)}
          className="w-full h-12 px-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}（保護者: {student.parentName}）
            </option>
          ))}
        </select>
      </div>

      {/* 選択中の生徒のアプリ権限トグル */}
      {selectedStudent && (
        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <h2 className="font-black text-slate-800 text-base mb-4 flex items-center gap-2">
            <span>👤</span> {selectedStudent.name} さんの利用可能アプリ
          </h2>

          <div className="space-y-4">
            {selectedStudent.subscriptions.map((sub: any) => (
              <AppSubscriptionToggle
                key={sub.appId}
                studentId={selectedStudent.id}
                appId={sub.appId}
                appName={sub.name}
                initialIsEnabled={sub.isEnabled}
                initialExpiresAt={sub.expiresAt}
                onUpdateSubscription={handleUpdateSubscription}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
