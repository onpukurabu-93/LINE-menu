'use client';

import { useState } from 'react';
import { PinAuthModal } from './PinAuthModal';

type Student = {
  id: string;
  name: string;
  level: string;
  practiceMinutes: number;
  subscriptions: { appId: string; name: string; isEnabled: boolean; expiresAt: string | null }[];
};

type Props = {
  parentId: string;
  students: Student[];
  onVerifyPin: (pin: string) => Promise<boolean>;
  onOpenParentMenu: () => void;
};

export function ChildMyPage({ parentId, students, onVerifyPin, onOpenParentMenu }: Props) {
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(0);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);

  const currentStudent = students[selectedStudentIndex];

  return (
    <div className="min-h-screen bg-amber-50/50 pb-20 font-sans">
      {/* 1. 兄弟切り替えタブ */}
      {students.length > 1 && (
        <div className="p-3 bg-white shadow-sm flex gap-2 overflow-x-auto sticky top-0 z-10">
          {students.map((student, idx) => (
            <button
              key={student.id}
              onClick={() => setSelectedStudentIndex(idx)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
                selectedStudentIndex === idx
                  ? 'bg-amber-400 text-amber-950 shadow-md scale-105'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              👦 {student.name}
            </button>
          ))}
        </div>
      )}

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* 2. ステータスカード */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 text-8xl opacity-10 font-black">🎵</div>
          
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                ピアノ冒険家
              </span>
              <h2 className="text-2xl font-black mt-1">{currentStudent.name} のマイページ</h2>
            </div>
            <div className="bg-amber-300 text-amber-950 font-black px-3 py-1.5 rounded-2xl text-center shadow">
              <p className="text-[10px] leading-tight">レベル</p>
              <p className="text-xl leading-none">{currentStudent.level}</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>⏱️ こんげつのれんしゅう</span>
              <span>4時間20分</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden">
              <div className="bg-amber-300 h-full rounded-full w-[70%] transition-all duration-500" />
            </div>
          </div>
        </div>

        {/* 3. 教材アプリ一覧 */}
        <div>
          <h3 className="text-sm font-bold text-gray-600 mb-2 px-1">🎮 あそべるアプリ・きょうざい</h3>
          <div className="space-y-3">
            {currentStudent.subscriptions.map((sub) => {
              const isExpired = sub.expiresAt ? new Date(sub.expiresAt) < new Date() : true;
              const isActive = sub.isEnabled && !isExpired;

              return (
                <div
                  key={sub.appId}
                  className={`rounded-2xl p-4 border-2 transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-white border-emerald-400 shadow-md'
                      : 'bg-gray-100/80 border-gray-200 opacity-70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                      isActive ? 'bg-emerald-100' : 'bg-gray-200'
                    }`}>
                      {sub.appId === 'rhythm' ? '🥁' : '🎼'}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-base">{sub.name}</h4>
                      <p className="text-xs text-gray-500 font-medium">
                        {isActive ? '有効期限内（あそべるよ！）' : 'おうちの人・先生に確認してね'}
                      </p>
                    </div>
                  </div>

                  <div>
                    {isActive ? (
                      <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-sm shadow active:scale-95 transition-all">
                        ひらく ➔
                      </button>
                    ) : (
                      <span className="bg-gray-200 text-gray-500 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1">
                        🔒 ロック
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. 保護者専用メニューボタン */}
        <div className="pt-6">
          <button
            type="button"
            onClick={() => setIsPinModalOpen(true)}
            className="w-full py-3.5 bg-white border-2 border-dashed border-gray-300 rounded-2xl font-bold text-xs text-gray-500 flex items-center justify-center gap-2 hover:border-indigo-400 hover:text-indigo-600 transition-all active:scale-98"
          >
            🔑 保護者専用メニュー（おうちの人へ）
          </button>
        </div>
      </div>

      <PinAuthModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        verifyPinApi={onVerifyPin}
        onSuccess={() => {
          setIsPinModalOpen(false);
          onOpenParentMenu();
        }}
      />
    </div>
  );
}
