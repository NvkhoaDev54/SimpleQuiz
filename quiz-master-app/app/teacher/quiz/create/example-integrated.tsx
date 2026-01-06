"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { useCreateQuiz } from "@/lib/hooks/useQuiz";
import { useQuizSocket } from "@/lib/hooks/useSocket";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

export default function QuizCreateExamplePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { create, loading: creating } = useCreateQuiz();
  const { register } = useQuizSocket();

  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    duration: 60,
  });

  // Redirect if not authenticated or not teacher
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user?.role !== "teacher") {
      router.push("/student/dashboard");
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call API to create quiz
      const quiz = await create(formData);

      // Register quiz with socket for real-time functionality
      register({
        id: quiz.id,
        title: quiz.title,
        duration: quiz.duration,
        questions: quiz.questions,
        createdAt: quiz.createdAt,
        status: quiz.status as "active" | "ended",
        participants: quiz.participants,
      });

      alert(`Quiz created successfully! ID: ${quiz.id}`);

      // Redirect to quiz detail page
      router.push(`/teacher/quiz/${quiz.id}`);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create quiz";
      alert("Failed to create quiz: " + errorMessage);
    }
  };

  if (!isAuthenticated || user?.role !== "teacher") {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <h1 className="text-2xl font-bold mb-6">Create New Quiz</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Quiz Title</label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter quiz title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Topic (for AI generation)
            </label>
            <Input
              type="text"
              value={formData.topic}
              onChange={(e) =>
                setFormData({ ...formData, topic: e.target.value })
              }
              placeholder="e.g., JavaScript Programming"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Duration (minutes)
            </label>
            <Input
              type="number"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: parseInt(e.target.value) })
              }
              min={1}
              max={180}
              required
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={creating} className="flex-1">
              {creating ? "Creating..." : "Create Quiz"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
