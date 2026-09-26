'use client';

import { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  verifyPinApi: (pin: string) => Promise<boolean>;
};

export function PinAuthModal({ isOpen, onClose, onSuccess, verifyPinApi }: Props) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleNumberClick = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setError(false);

      if (newPin.length === 4) {
        checkPin(newPin);
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
    setError(false);
  };

  const checkPin = async (inputPin: string) => {
    setLoading(true);
    const isValid = await verifyPinApi(inputPin);
    setLoading(false);

    if (isValid) {
      setPin('');
      onSuccess();
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl animate-in slide-in-from-bottom duration-200">
        <h3 className="text-lg font-bold text-gray-800 mb-1">🔒 保護者確認</h3>
        <p className="text-xs text-gray-500 mb-6">設定した4桁の暗証番号を入力してください</p>

        <div className="flex justify-center gap-4 mb-6">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full border-2 transition-all duration-150 ${
                pin.length > index
                  ? 'bg-indigo-600 border-indigo-600 scale-110'
                  : 'border-gray-300 bg-gray-50'
              }`}
            />
          ))}
        </div>

        {error && <p className="text-xs text-red-500 font-bold mb-4 animate-bounce">暗証番号がちがいます</p>}

        <div className="grid grid-cols-3 gap-3 mb-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleNumberClick(num)}
              disabled={loading}
              className="h-14 rounded-2xl bg-gray-100 font-bold text-xl text-gray-800 active:bg-indigo-100 active:text-indigo-600 transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={onClose}
            className="h-14 rounded-2xl bg-gray-50 text-xs font-bold text-gray-400"
          >
            キャンセル
          </button>
          <button
            type="button"
            onClick={() => handleNumberClick('0')}
            disabled={loading}
            className="h-14 rounded-2xl bg-gray-100 font-bold text-xl text-gray-800 active:bg-indigo-100"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="h-14 rounded-2xl bg-gray-100 text-sm font-bold text-gray-600 active:bg-red-100 active:text-red-600"
          >
            ⌫
          </button>
        </div>
      </div>
    </div>
  );
}
