"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import ClassCard from "@/components/dashboard/ClassCard";
import Modal from "@/components/ui/Modal";

export default function ClassesListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const classes = [
    {
      id: "1",
      name: "Advanced Mathematics",
      code: "MATH 201",
      semester: "Fall 2023",
      coverImage:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400",
      status: "active" as const,
      studentCount: 34,
      quizCount: 5,
    },
    {
      id: "2",
      name: "Intro to Physics",
      code: "PHYS 101",
      semester: "Fall 2023",
      coverImage:
        "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400",
      status: "active" as const,
      studentCount: 42,
      quizCount: 3,
    },
    {
      id: "3",
      name: "Computer Science I",
      code: "CS 101",
      semester: "Fall 2023",
      coverImage:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400",
      status: "active" as const,
      studentCount: 56,
      quizCount: 8,
    },
    {
      id: "4",
      name: "Web Development",
      code: "CS 204",
      semester: "Fall 2023",
      coverImage:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
      status: "pending" as const,
      studentCount: 12,
      quizCount: 1,
    },
    {
      id: "5",
      name: "History of Art",
      code: "ART 100",
      semester: "Spring 2023",
      coverImage:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400",
      status: "archived" as const,
      studentCount: 88,
      quizCount: 12,
    },
  ];

  const filteredClasses = classes.filter((cls) => {
    const matchesFilter = activeFilter === "all" || cls.status === activeFilter;
    const matchesSearch =
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
        {/* Top Navigation */}
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-surface-border bg-white/90 dark:bg-[#111318]/90 backdrop-blur-md px-4 py-3 lg:px-10">
          <div className="flex items-center gap-4">
            <div className="size-8 text-primary flex items-center justify-center">
              <Icon name="school" size="xl" />
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
              Quiz App
            </h2>
          </div>
          <nav className="hidden md:flex flex-1 justify-center gap-8 px-8">
            <Link
              href="/teacher/dashboard"
              className="text-slate-500 dark:text-text-secondary hover:text-primary dark:hover:text-white text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/teacher/classes"
              className="text-primary dark:text-white text-sm font-medium"
            >
              Classes
            </Link>
            <Link
              href="/teacher/library"
              className="text-slate-500 dark:text-text-secondary hover:text-primary dark:hover:text-white text-sm font-medium transition-colors"
            >
              Library
            </Link>
            <Link
              href="/teacher/reports"
              className="text-slate-500 dark:text-text-secondary hover:text-primary dark:hover:text-white text-sm font-medium transition-colors"
            >
              Reports
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:flex"
            >
              Create Class
            </Button>
            <div className="relative group cursor-pointer">
              <div
                className="bg-cover rounded-full size-9 ring-2 ring-transparent group-hover:ring-primary/50 transition-all"
                style={{
                  backgroundImage:
                    "url('https://api.dicebear.com/7.x/avataaars/svg?seed=teacher')",
                }}
              />
            </div>
            <button className="md:hidden text-slate-500 dark:text-white">
              <Icon name="menu" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-4 md:px-12 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
              {/* Breadcrumb */}
              <div className="flex flex-wrap gap-2 px-4 py-2">
                <Link
                  href="/"
                  className="text-slate-500 dark:text-text-secondary text-sm font-medium hover:text-primary transition-colors"
                >
                  Home
                </Link>
                <span className="text-slate-400 dark:text-text-secondary text-sm font-medium">
                  /
                </span>
                <span className="text-slate-900 dark:text-white text-sm font-medium">
                  Classes
                </span>
              </div>

              {/* Page Heading */}
              <div className="flex flex-wrap justify-between items-end gap-4 p-4">
                <div className="flex min-w-72 flex-col gap-2">
                  <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                    My Classes
                  </h1>
                  <p className="text-slate-500 dark:text-text-secondary text-base">
                    Manage your courses, assignments, and students
                  </p>
                </div>
                <Button variant="outline" onClick={() => setIsModalOpen(true)}>
                  <Icon name="add_link" size="sm" className="mr-2" />
                  Join Class
                </Button>
              </div>

              {/* Toolbar & Filters */}
              <div className="flex flex-col gap-4 px-4 py-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  {/* Search */}
                  <div className="relative flex flex-1 max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Icon name="search" className="text-slate-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full rounded-lg border-0 py-2.5 pl-10 pr-4 text-slate-900 dark:text-white bg-white dark:bg-surface-dark ring-1 ring-inset ring-slate-300 dark:ring-surface-border placeholder: text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm"
                      placeholder="Search classes..."
                    />
                  </div>
                  {/* Tools */}
                  <div className="flex gap-2 self-end md:self-auto">
                    <button
                      aria-label="Filter"
                      className="flex items-center justify-center p-2.5 rounded-lg bg-white dark:bg-surface-dark ring-1 ring-inset ring-slate-300 dark:ring-surface-border text-slate-600 dark:text-white hover: bg-slate-50 dark: hover:bg-surface-border transition-colors"
                    >
                      <Icon name="filter_list" />
                    </button>
                    <button
                      aria-label="Sort"
                      className="flex items-center justify-center p-2.5 rounded-lg bg-white dark:bg-surface-dark ring-1 ring-inset ring-slate-300 dark:ring-surface-border text-slate-600 dark: text-white hover:bg-slate-50 dark:hover:bg-surface-border transition-colors"
                    >
                      <Icon name="sort" />
                    </button>
                  </div>
                </div>

                {/* Filter Chips */}
                <div className="flex gap-2 flex-wrap items-center">
                  {[
                    { label: "All Classes", value: "all" },
                    { label: "Active", value: "active" },
                    { label: "Archived", value: "archived" },
                    { label: "Semester 1", value: "semester1" },
                  ].map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setActiveFilter(filter.value)}
                      className={`flex h-8 shrink-0 items-center justify-center px-4 rounded-full transition-colors ${
                        activeFilter === filter.value
                          ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                          : "bg-slate-200 dark:bg-surface-border hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark: text-white"
                      }`}
                    >
                      <p className="text-sm font-medium">{filter.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Classes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {filteredClasses.map((cls) => (
                  <ClassCard key={cls.id} {...cls} />
                ))}

                {/* Add New Card */}
                <div
                  onClick={() => setIsModalOpen(true)}
                  className="flex flex-col overflow-hidden rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#151b26] hover:bg-slate-100 dark:hover:bg-[#1a2330] transition-colors cursor-pointer group"
                >
                  <div className="flex flex-1 flex-col items-center justify-center p-8 gap-4 text-center">
                    <div className="rounded-full bg-slate-200 dark:bg-surface-border p-4 text-slate-500 dark:text-text-secondary group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                      <Icon name="add" className="text-4xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold leading-tight mb-1">
                        Create New Class
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-text-secondary">
                        Set up a new course and invite students
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center p-8">
                <p className="text-sm text-slate-400 dark:text-text-secondary">
                  Showing {filteredClasses.length} of {classes.length} classes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Class Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Class"
      >
        <form className="grid grid-cols-1 gap-5">
          <div className="space-y-2">
            <label className="block text-sm font-semibold">
              Class Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g.  Introduction to Psychology"
              className="block w-full rounded-lg border-0 py-2.5 px-3 text-slate-900 dark:text-white bg-slate-50 dark:bg-[#101622] ring-1 ring-inset ring-slate-300 dark:ring-[#282e39] placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold">Description</label>
            <textarea
              rows={4}
              placeholder="Enter a brief description of the class..."
              className="block w-full rounded-lg border-0 py-2.5 px-3 text-slate-900 dark:text-white bg-slate-50 dark:bg-[#101622] ring-1 ring-inset ring-slate-300 dark:ring-[#282e39] placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary text-sm resize-none"
            />
            <p className="text-xs text-slate-500 dark: text-slate-400 text-right">
              0/300 characters
            </p>
          </div>
        </form>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsModalOpen(false)}>
            <Icon name="add" size="sm" className="mr-2" />
            Create Class
          </Button>
        </div>
      </Modal>
    </>
  );
}
