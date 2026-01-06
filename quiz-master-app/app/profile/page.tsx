"use client";

import { useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"info" | "password">("info");

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display min-h-screen flex flex-col overflow-x-hidden">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-[#282e39] bg-white dark:bg-[#111318] px-4 py-3 md:px-10">
        <div className="flex items-center gap-4">
          <div className="size-8 text-primary">
            <Icon name="school" size="xl" />
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] hidden sm:block">
            Quiz Master
          </h2>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-slate-600 dark:text-text-secondary hover:text-primary dark:hover:text-white text-sm font-medium transition-colors"
          >
            Trang chủ
          </Link>
          <Link
            href="/courses"
            className="text-slate-600 dark:text-text-secondary hover:text-primary dark: hover:text-white text-sm font-medium transition-colors"
          >
            Bài trắc nghiệm
          </Link>
          <Link
            href="/results"
            className="text-slate-600 dark:text-text-secondary hover:text-primary dark:hover:text-white text-sm font-medium transition-colors"
          >
            Kết quả
          </Link>
          <Link
            href="/profile"
            className="text-primary dark:text-white text-sm font-bold"
          >
            Hồ sơ
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="secondary" size="sm" className="hidden sm:flex">
              <Icon name="logout" className="mr-2" />
              <span>Đăng xuất</span>
            </Button>
          </Link>
          <div className="relative group cursor-pointer">
            <div
              className="bg-cover rounded-full size-10 border-2 border-transparent group-hover:border-primary transition-all"
              style={{
                backgroundImage:
                  "url('https://api.dicebear.com/7.x/avataaars/svg?seed=teacher')",
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="layout-container flex grow flex-col">
        <div className="flex flex-1 justify-center py-5 px-4 md:px-6 lg:px-40">
          <div className="layout-content-container flex flex-col max-w-5xl flex-1 w-full gap-6">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 items-center text-sm">
              <Link
                href="/"
                className="text-text-secondary hover:text-primary transition-colors"
              >
                Trang chủ
              </Link>
              <Icon
                name="chevron_right"
                className="text-text-secondary text-[16px]"
              />
              <span className="font-medium">Hồ sơ cá nhân</span>
            </div>

            {/* Page Header */}
            <div className="flex flex-wrap justify-between items-end gap-4 border-b border-gray-200 dark:border-[#282e39] pb-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                  Hồ sơ cá nhân
                </h1>
                <p className="text-text-secondary text-base">
                  Quản lý thông tin và cài đặt bảo mật cho tài khoản của bạn
                </p>
              </div>
              <div className="flex gap-2">
                <Badge
                  variant="success"
                  className="h-8 px-4 flex items-center gap-2"
                >
                  <Icon name="verified" size="sm" />
                  <p className="text-sm font-bold">Giảng viên</p>
                </Badge>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Sidebar */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                {/* Profile Card */}
                <Card className="p-6 flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-r from-blue-600 to-blue-400 opacity-20 dark:opacity-10" />
                  <div className="relative mt-4 mb-4">
                    <div
                      className="bg-cover rounded-full h-32 w-32 border-4 border-white dark:border-card-dark shadow-lg"
                      style={{
                        backgroundImage:
                          "url('https://api.dicebear.com/7.x/avataaars/svg?seed=teacher')",
                      }}
                    />
                    <button
                      className="absolute bottom-0 right-0 bg-primary hover:bg-blue-600 text-white p-2 rounded-full shadow-md transition-colors flex items-center justify-center"
                      aria-label="Change Avatar"
                    >
                      <Icon name="photo_camera" className="text-[18px]" />
                    </button>
                  </div>
                  <h3 className="text-xl font-bold mb-1">Nguyễn Văn A</h3>
                  <p className="text-text-secondary text-sm mb-4">
                    nguyen.vana@university.edu. vn
                  </p>
                  <div className="w-full h-px bg-gray-100 dark:bg-[#282e39] mb-4" />
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-text-secondary">Khoa</span>
                      <span className="font-medium">Công nghệ thông tin</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-text-secondary">Tham gia từ</span>
                      <span className="font-medium">Tháng 9, 2021</span>
                    </div>
                  </div>
                </Card>

                {/* Activity Stats */}
                <Card className="overflow-hidden">
                  <div className="p-4 border-b border-gray-100 dark:border-[#282e39]">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-text-secondary">
                      Thống kê hoạt động
                    </h4>
                  </div>
                  <div className="p-0">
                    <div className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-[#202836] transition-colors border-b border-gray-100 dark:border-[#282e39]">
                      <div className="size-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                        <Icon name="quiz" />
                      </div>
                      <div>
                        <p className="text-xl font-bold">24</p>
                        <p className="text-xs text-text-secondary">
                          Bài trắc nghiệm đã tạo
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-[#202836] transition-colors">
                      <div className="size-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                        <Icon name="groups" />
                      </div>
                      <div>
                        <p className="text-xl font-bold">156</p>
                        <p className="text-xs text-text-secondary">
                          Sinh viên tham gia
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-8 flex flex-col gap-8">
                {/* Personal Information */}
                <Card className="p-6 md:p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-bold mb-1">
                        Thông tin cá nhân
                      </h3>
                      <p className="text-text-secondary text-sm">
                        Cập nhật thông tin chi tiết và thông tin liên hệ của
                        bạn.
                      </p>
                    </div>
                    <button className="text-primary hover:text-blue-400 text-sm font-medium flex items-center gap-1">
                      <Icon name="edit" className="text-[18px]" />
                      <span>Sửa</span>
                    </button>
                  </div>

                  <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Avatar Section */}
                    <div className="col-span-1 md:col-span-2 pb-2">
                      <label className="block text-sm font-medium text-text-secondary mb-3">
                        Ảnh đại diện
                      </label>
                      <div className="flex items-center gap-5">
                        <div className="h-20 w-20 shrink-0">
                          <div
                            className="bg-cover rounded-full h-full w-full border border-gray-200 dark:border-[#282e39]"
                            style={{
                              backgroundImage:
                                "url('https://api.dicebear.com/7.x/avataaars/svg?seed=teacher')",
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-wrap gap-3">
                            <Button variant="secondary" size="sm">
                              <Icon name="image" className="text-[18px] mr-2" />
                              Thay đổi ảnh
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                            >
                              Xóa
                            </Button>
                          </div>
                          <p className="text-xs text-text-secondary">
                            Định dạng hỗ trợ: JPG, PNG, GIF. Kích thước tối đa:
                            5MB.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Full Name */}
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Họ và tên
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Icon name="person" className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          defaultValue="Nguyễn Văn A"
                          className="w-full bg-gray-50 dark:bg-input-dark border border-gray-200 dark:border-transparent rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white dark:focus:bg-[#202630] transition-all outline-none"
                          placeholder="Nhập họ tên của bạn"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Email
                      </label>
                      <div className="relative opacity-70">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Icon name="mail" className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          defaultValue="nguyen.vana@university.edu.vn"
                          disabled
                          className="w-full bg-gray-100 dark:bg-input-dark border border-gray-200 dark:border-transparent rounded-lg py-2.5 pl-10 pr-4 text-sm cursor-not-allowed"
                          aria-label="Email (không thể thay đổi)"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Số điện thoại
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Icon name="phone" className="text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          defaultValue="0901234567"
                          className="w-full bg-gray-50 dark:bg-input-dark border border-gray-200 dark:border-transparent rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white dark:focus:bg-[#202630] transition-all outline-none"
                          placeholder="Nhập số điện thoại"
                        />
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Giới thiệu bản thân
                      </label>
                      <textarea
                        rows={3}
                        className="w-full bg-gray-50 dark:bg-input-dark border border-gray-200 dark:border-transparent rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white dark:focus:bg-[#202630] transition-all outline-none resize-none"
                        placeholder="Viết một vài dòng về bản thân bạn..."
                      />
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-2">
                      <Button variant="outline">Hủy</Button>
                      <Button>Lưu thay đổi</Button>
                    </div>
                  </form>
                </Card>

                {/* Change Password */}
                <Card className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                      <Icon name="lock" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Đổi mật khẩu</h3>
                      <p className="text-text-secondary text-sm">
                        Đảm bảo tài khoản của bạn luôn an toàn với mật khẩu
                        mạnh.
                      </p>
                    </div>
                  </div>

                  <form className="space-y-4 max-w-lg">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Mật khẩu hiện tại
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-gray-50 dark:bg-input-dark border border-gray-200 dark:border-transparent rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white dark:focus:bg-[#202630] transition-all outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Mật khẩu mới
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full bg-gray-50 dark:bg-input-dark border border-gray-200 dark:border-transparent rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white dark:focus:bg-[#202630] transition-all outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Xác nhận mật khẩu mới
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full bg-gray-50 dark:bg-input-dark border border-gray-200 dark:border-transparent rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white dark:focus:bg-[#202630] transition-all outline-none"
                        />
                      </div>
                    </div>
                    <div className="pt-2">
                      <Button variant="secondary">Cập nhật mật khẩu</Button>
                    </div>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
