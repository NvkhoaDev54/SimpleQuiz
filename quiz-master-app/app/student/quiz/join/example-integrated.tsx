"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { useQuizSocket } from "@/lib/hooks/useSocket";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

export default function QuizJoinExamplePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { join, quizData, quizStarted } = useQuizSocket();

  const [quizId, setQuizId] = useState("");
  // Derive joined state from quizData instead of storing in state
  const joined = Boolean(quizData);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Handle quiz started
  useEffect(() => {
    if (quizStarted && quizData) {
      console.log("Quiz started! Redirecting to take quiz...");
      router.push(`/student/quiz/take/${quizData.id}`);
    }
  }, [quizStarted, quizData, router]);

  const handleJoinQuiz = () => {
    if (!quizId || !user) {
      alert("Please enter a quiz ID");
      return;
    }

    // Join quiz via socket
    join({
      quizId: quizId.trim(),
      userId: user.id,
    });
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-md">
      <Card>
        <h1 className="text-2xl font-bold mb-6">Join Quiz</h1>

        {!joined ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Enter Quiz ID
              </label>
              <Input
                type="text"
                value={quizId}
                onChange={(e) => setQuizId(e.target.value)}
                placeholder="Enter 6-digit quiz ID"
                maxLength={6}
              />
            </div>

            <Button onClick={handleJoinQuiz} className="w-full">
              Join Quiz
            </Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="mb-4">
              <div className="inline-block w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-lg font-medium">Joined Successfully!</p>
            <p className="text-sm text-gray-600 mt-2">
              Waiting for teacher to start the quiz...
            </p>

            {quizData && (
              <div className="mt-6 text-left bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{quizData.title}</h3>
                <p className="text-sm text-gray-600">
                  Duration: {quizData.duration} minutes
                </p>
                <p className="text-sm text-gray-600">
                  Questions: {quizData.questions?.length || 0}
                </p>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
