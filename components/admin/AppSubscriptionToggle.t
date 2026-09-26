'use client';

import { useState } from 'react';

type Props = {
  studentId: string;
  appId: string;
  appName: string;
  initialIsEnabled: boolean;
  initialExpiresAt: string | null;
  onUpdateSubscription: (studentId: string, appId: string, currentlyActive: boolean) => Promise<void>;
};

export function AppSubscriptionToggle({
  studentId,
  appId,
  appName,
  initialIsEnabled,
  initialExpiresAt,
  onUpdateSubscription,
}: Props) {
  const [isEnabled, setIsEnabled] = useState(initialIsEnabled);
  const [expiresAt, setExpiresAt] = useState<string | null>(initialExpiresAt);
  const [loading, setLoading] = useState(false);

  const isExpired = expiresAt ? new Date(expiresAt) < new Date() : true;
  const isActive = isEnabled && !isExpired;

  const handleToggle = async () => {
    setLoading(true);
    try {
      await onUpdateSubscription(studentId, appId, isActive);
      
      if (isActive) {
        setIsEnabled(false);
      } else {
        setIsEnabled(true);
      }
    } catch (error) {
      alert('更新に失敗しました。再試行してください。');
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = expiresAt
    ? new Date(expiresAt).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })
    : '';

  return (
    <div className="mb-3">
      <p className="text-xs font-bold text-gray-500 mb-1">{appName}</p>
      <button
        type="button"
        onClick={handleToggle}
        disabled={loading}
        className={`w-full h-14 px-4 rounded-2xl font-bold flex items-center justify-between transition-all duration-200 active:scale-95 shadow-sm ${
          isActive
            ? 'bg-emerald-500 text-white border-2 border-emerald-600'
            : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
        }`}
      >
        <div className="flex items-center gap-2 text-base">
          <span className={`w-3 h-3 rounded-full ${isActive ? 'bg-white animate-pulse' : 'bg-gray-300'}`} />
          {isActive ? '有効 (ON)' : '停止中 (OFF)'}
        </div>
        
        <div className="text-sm">
          {isActive ? `${formattedDate} まで利用可能 ➔` : 'タップしてONにする ➔'}
        </div>
      </button>
    </div>
  );
}
