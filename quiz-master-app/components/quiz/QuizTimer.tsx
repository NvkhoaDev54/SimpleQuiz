"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

interface QuizTimerProps {
  initialMinutes: number;
  onTimeUp?: () => void;
}

export default function QuizTimer({
  initialMinutes,
  onTimeUp,
}: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <Card className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold dark:text-white flex items-center gap-2">
          <Icon name="timer" className="text-primary" />
          Thời gian còn lại
        </h3>
      </div>
      <div className="flex gap-2">
        <div className="flex flex-1 flex-col items-center gap-1 bg-slate-100 dark:bg-[#282e39] rounded-lg py-2">
          <span className="text-2xl font-bold text-slate-800 dark:text-white font-mono">
            {hours.toString().padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase text-slate-500 dark: text-slate-400 font-bold tracking-wider">
            Giờ
          </span>
        </div>
        <div className="flex flex-col justify-center text-slate-400 font-bold">
          :{" "}
        </div>
        <div className="flex flex-1 flex-col items-center gap-1 bg-slate-100 dark:bg-[#282e39] rounded-lg py-2">
          <span className="text-2xl font-bold text-slate-800 dark:text-white font-mono">
            {minutes.toString().padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase text-slate-500 dark:text-slate-400 font-bold tracking-wider">
            Phút
          </span>
        </div>
        <div className="flex flex-col justify-center text-slate-400 font-bold">
          :
        </div>
        <div className="flex flex-1 flex-col items-center gap-1 bg-slate-100 dark:bg-[#282e39] rounded-lg py-2">
          <span className="text-2xl font-bold text-slate-800 dark:text-white font-mono">
            {seconds.toString().padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase text-slate-500 dark:text-slate-400 font-bold tracking-wider">
            Giây
          </span>
        </div>
      </div>
    </Card>
  );
}
