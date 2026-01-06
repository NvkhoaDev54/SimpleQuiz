"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Icon from "@/components/ui/Icon";

export default function RegisterPage() {
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-[#111318] dark:text-white overflow-x-hidden">
      {/* Navigation */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e5e7eb] dark:border-b-[#282e39] px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-4">
          <div className="size-8 text-primary">
            <Icon name="school" size="xl" />
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] dark:text-white text-gray-900">
            Quiz App
          </h2>
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-sm text-text-secondary font-medium">
            Đã có tài khoản?
          </span>
          <Link href="/login">
            <Button variant="secondary" size="sm">
              Đăng nhập
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex justify-center py-10 px-4 sm:px-6">
        <div className="flex flex-col max-w-[480px] w-full gap-6">
          {/* Heading */}
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h1 className="text-[32px] font-bold leading-tight tracking-tight">
              Tạo tài khoản mới
            </h1>
            <p className="text-text-secondary text-sm font-normal leading-normal">
              Tham gia cùng chúng tôi để bắt đầu học tập và giảng dạy.
            </p>
          </div>

          {/* Role Selection */}
          <div className="flex w-full p-1 bg-gray-200 dark:bg-surface-dark rounded-xl">
            <button
              onClick={() => setRole("student")}
              className={`flex-1 py-2. 5 text-sm font-semibold rounded-lg transition-all ${
                role === "student"
                  ? "bg-white dark:bg-primary text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-text-secondary"
              }`}
            >
              Sinh viên
            </button>
            <button
              onClick={() => setRole("teacher")}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                role === "teacher"
                  ? "bg-white dark:bg-primary text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark: text-text-secondary"
              }`}
            >
              Giảng viên
            </button>
          </div>

          {/* Form */}
          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium leading-normal">
                Họ và tên
              </label>
              <Input type="text" placeholder="Nhập họ và tên của bạn" />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium leading-normal">
                Email
              </label>
              <Input type="email" placeholder="Nhập địa chỉ email của bạn" />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium leading-normal">
                Mật khẩu
              </label>
              <div className="relative flex w-full items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu (tối thiểu 8 ký tự)"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-[#3b4354] bg-white dark:bg-surface-dark h-12 placeholder:text-gray-400 dark:placeholder:text-text-secondary pl-4 pr-12 text-base font-normal leading-normal transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-gray-400 dark:text-text-secondary hover:text-primary transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <Icon
                    name={showPassword ? "visibility_off" : "visibility"}
                    size="sm"
                  />
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium leading-normal">
                Xác nhận mật khẩu
              </label>
              <div className="relative flex w-full items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-[#3b4354] bg-white dark:bg-surface-dark h-12 placeholder:text-gray-400 dark:placeholder:text-text-secondary pl-4 pr-12 text-base font-normal leading-normal transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-gray-400 dark:text-text-secondary hover:text-primary transition-colors"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  <Icon
                    name={showConfirmPassword ? "visibility_off" : "visibility"}
                    size="sm"
                  />
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex gap-3 items-start py-1">
              <div className="flex h-6 items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-5 w-5 rounded border-gray-300 dark:border-[#3b4354] bg-white dark:bg-surface-dark text-primary focus:ring-primary dark:focus:ring-offset-background-dark"
                />
              </div>
              <div className="text-sm leading-6">
                <label
                  htmlFor="terms"
                  className="font-normal text-gray-500 dark:text-text-secondary"
                >
                  Tôi đồng ý với{" "}
                  <Link
                    href="#"
                    className="font-semibold text-primary hover:underline"
                  >
                    Điều khoản dịch vụ
                  </Link>{" "}
                  và{" "}
                  <Link
                    href="#"
                    className="font-semibold text-primary hover:underline"
                  >
                    Chính sách bảo mật
                  </Link>
                  .
                </label>
              </div>
            </div>

            {/* Submit */}
            <Link
              href={
                role === "student" ? "/student/dashboard" : "/teacher/dashboard"
              }
            >
              <Button
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
              >
                Đăng ký tài khoản
              </Button>
            </Link>
          </form>

          {/* Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-300 dark:border-[#3b4354]"></div>
            <span className="flex-shrink-0 mx-4 text-sm text-gray-400 dark:text-text-secondary">
              Hoặc tiếp tục với
            </span>
            <div className="flex-grow border-t border-gray-300 dark:border-[#3b4354]"></div>
          </div>

          {/* Social Login */}
          <Button variant="outline" className="w-full h-12">
            <Image
              src="https://www.google.com/favicon.ico"
              alt="Google"
              width={20}
              height={20}
              className="mr-2"
            />
            <span>Google</span>
          </Button>

          {/* Mobile Login Link */}
          <div className="mt-4 text-center sm:hidden">
            <p className="text-sm text-gray-500 dark:text-text-secondary">
              Đã có tài khoản?{" "}
              <Link
                href="/login"
                className="font-bold text-primary hover:underline"
              >
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center">
        <p className="text-xs text-gray-400 dark:text-[#4e5667]">
          © 2024 Quiz App Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
