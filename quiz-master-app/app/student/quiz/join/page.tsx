'use client';

import { useState, useRef, KeyboardEvent, ClipboardEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { useSocket } from '@/lib/hooks/useSocket';

export default function QuizJoinPage() {
  const router = useRouter();
  const [pin, setPin] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { socket } = useSocket();

  const handleInput = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    if (!/^\d+$/.test(text)) return;

    const digits = text.split('').slice(0, 6);
    const newPin = [...pin];
    digits.forEach((digit, i) => {
      newPin[i] = digit;
    });
    setPin(newPin);

    const lastIndex = Math.min(digits.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleSubmit = async () => {
    const code = pin.join('');
    
    if (code.length !== 6) {
      setError('Vui lòng nhập đủ 6 số');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Connect to socket if not connected
      if (!socket?.connected) {
        socket?.connect();
      }

      // Join quiz room
      socket?.emit('join-quiz', { pin: code }, (response: any) => {
        setLoading(false);
        
        if (response.success) {
          // Redirect to quiz taking page
          router.push(`/student/quiz/take/${code}`);
        } else {
          setError(response.error || 'Mã PIN không hợp lệ');
        }
      });
    } catch (err) {
      setLoading(false);
      setError('Có lỗi xảy ra. Vui lòng thử lại');
    }
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen flex flex-col text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20 mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-20 mix-blend-screen" />
      </div>

      {/* Navigation Header */}
      <header className="w-full px-6 py-6 md:px-12 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
            <Icon name="school" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            QuizMaster
          </h2>
        </div>
        <Link href="/login">
          <Button variant="secondary" size="sm">
            <Icon name="person" size="sm" className="mr-2" />
            <span className="hidden sm:inline">Đăng nhập</span>
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-4">
              <Icon name="quiz" size="xl" className="text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Tham gia Quiz</h1>
            <p className="text-text-secondary text-lg">
              Nhập mã PIN 6 số để bắt đầu
            </p>
          </div>

          <div className="bg-white dark:bg-card-dark rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">
            {/* PIN Input */}
            <div className="flex gap-2 justify-center mb-6">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInput(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-gray-800 transition-all"
                  aria-label={`Chữ số thứ ${index + 1} của mã PIN`}
                />
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-center mb-6">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={loading || pin.join('').length !== 6}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Icon name="hourglass_empty" size="sm" className="mr-2 animate-spin" />
                  Đang kết nối...
                </>
              ) : (
                <>
                  <Icon name="login" size="sm" className="mr-2" />
                  Tham gia
                </>
              )}
            </Button>

            {/* Info */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-text-secondary text-center">
                💡 Mã PIN được cung cấp bởi giáo viên của bạn
              </p>
            </div>
          </div>

          {/* Alternative Action */}
          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary">
              Bạn là giáo viên?{' '}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Đăng nhập tại đây
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
