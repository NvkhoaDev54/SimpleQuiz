"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Icon from "@/components/ui/Icon";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen flex flex-col text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]"></div>
      </div>

      {/* Navigation Header */}
      <header className="w-full px-6 py-6 md:px-12 flex justify-between items-center relative z-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="size-8 text-primary">
            <Icon name="school" size="xl" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            QuizMaster
          </h2>
        </Link>
        <button
          className="text-slate-500 hover:text-primary dark:text-slate-400 transition-colors"
          aria-label="Change language"
        >
          <Icon name="language" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-[440px] flex flex-col">
          <div className="bg-white dark:bg-card-dark rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden p-8 sm:p-10">
            {/* Header Text */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                Đăng nhập
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-base font-normal">
                Chào mừng trở lại! Vui lòng nhập thông tin để tiếp tục.
              </p>
            </div>

            {/* Form */}
            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-white text-sm font-medium">
                  Email hoặc Tên đăng nhập
                </label>
                <Input
                  type="text"
                  placeholder="user@example.com"
                  icon={<Icon name="person" size="sm" />}
                />
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-slate-900 dark:text-white text-sm font-medium">
                    Mật khẩu
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-primary hover:text-blue-400 transition-colors"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                    <Icon name="lock" size="sm" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="form-input block w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#11161f] text-slate-900 dark:text-white h-12 pl-10 pr-12 placeholder:text-slate-400 focus:border-primary focus: ring-1 focus:ring-primary transition-all text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <Icon
                      name={showPassword ? "visibility_off" : "visibility"}
                      size="sm"
                    />
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Link href="/student/dashboard">
                  <Button
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                  >
                    <span>Đăng nhập</span>
                    <Icon name="arrow_forward" className="ml-2" size="sm" />
                  </Button>
                </Link>
              </div>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white dark:bg-card-dark px-3 text-sm text-slate-500 dark:text-slate-400">
                  hoặc đăng nhập bằng
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-10">
                <Image
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <span>Google</span>
              </Button>
              <Button variant="outline" className="h-10">
                <Image
                  src="https://www.microsoft.com/favicon.ico"
                  alt="Microsoft"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <span>Microsoft</span>
              </Button>
            </div>
          </div>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Chưa có tài khoản?{" "}
              <Link
                href="/register"
                className="font-semibold text-primary hover:text-blue-400 transition-colors hover:underline"
              >
                Đăng ký tài khoản mới
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center z-10">
        <p className="text-xs text-slate-400 dark:text-slate-500">
          © 2024 QuizMaster. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
