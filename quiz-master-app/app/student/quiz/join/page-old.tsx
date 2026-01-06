"use client";

import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

export default function QuizJoinPage() {
  const router = useRouter();
  const [pin, setPin] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!/^\d+$/.test(text)) return;

    const digits = text.split("").slice(0, 6);
    const newPin = [...pin];
    digits.forEach((digit, i) => {
      newPin[i] = digit;
    });
    setPin(newPin);

    const lastIndex = Math.min(digits.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleSubmit = () => {
    const code = pin.join("");
    if (code.length === 6) {
      router.push(`/student/quiz/take/${code}`);
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
            QuizApp
          </h2>
        </div>
        <Link href="/login">
          <Button variant="secondary" size="sm">
            <Icon name="person" size="sm" className="mr-2" />
            <span className="hidden sm:inline">Giảng viên đăng nhập</span>
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md animate-fade-in">
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl dark:shadow-none border border-gray-100 dark:border-[#282e39] overflow-hidden p-8 sm:p-10">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Icon name="pin" className="text-4xl" />
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center mb-8">
              <h1 className="text-gray-900 dark:text-white text-3xl font-bold mb-3 tracking-tight">
                Nhập mã tham gia
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">
                Vui lòng nhập mã PIN 6 số do giảng viên cung cấp để bắt đầu bài
                kiểm tra.
              </p>
            </div>

            {/* PIN Inputs */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="flex justify-center gap-2 sm:gap-3 mb-8">
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInput(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    autoFocus={index === 0}
                    className="w-10 h-14 sm:w-12 sm:h-16 text-center text-2xl font-bold bg-gray-50 dark:bg-[#111318] border-b-2 border-gray-300 dark:border-[#3b4354] rounded-t-lg focus:outline-none focus:border-primary focus:ring-0 text-gray-900 dark:text-white transition-all caret-primary"
                  />
                ))}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                disabled={pin.join("").length !== 6}
              >
                Tham gia ngay
                <Icon name="arrow_forward" size="sm" className="ml-2" />
              </Button>
            </form>

            {/* Footer Note */}
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-[#282e39] text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Gặp sự cố?{" "}
                <Link
                  href="#"
                  className="text-primary hover:text-primary-hover font-medium underline decoration-primary/30 underline-offset-2"
                >
                  Liên hệ hỗ trợ
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
