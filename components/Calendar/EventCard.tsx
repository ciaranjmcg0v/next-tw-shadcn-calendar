"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import PremierLeagueIcon from "@/public/assets/icons/premier-league.svg";
import Confetti from "react-confetti";

const CountdownToEventTimer = ({ onComplete }: { onComplete: () => void }) => {
  const calculateTimeLeft = () => {
    const currentTime = new Date();
    const target = new Date();
    target.setDate(16);
    target.setHours(20, 0, 0, 0); // 20:00:00.000 (8:00 PM)

    const diffTime = target.getTime() - currentTime.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(
      (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

    return {
      remainingDays: diffDays,
      remainingHours: diffHours,
      remainingMinutes: diffMinutes,
      remainingSeconds: diffSeconds,
      isCompleted: diffTime <= 0,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      if (newTimeLeft.isCompleted) {
        onComplete(); // Trigger onComplete callback when the countdown finishes
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  const formatTime = (unit: number) => unit.toString().padStart(2, "0");

  return (
    <div className="text-xs font-medium flex items-center space-x-1">
      {timeLeft.remainingDays > 0 && (
        <span>{formatTime(timeLeft.remainingDays)}d</span>
      )}
      {timeLeft.remainingHours > 0 && (
        <span>{formatTime(timeLeft.remainingHours)}h</span>
      )}
      {timeLeft.remainingMinutes > 0 && (
        <span>{formatTime(timeLeft.remainingMinutes)}m</span>
      )}
      {timeLeft.remainingSeconds > 0 && (
        <span>{formatTime(timeLeft.remainingSeconds)}s</span>
      )}
      {timeLeft.remainingDays === 0 &&
        timeLeft.remainingHours === 0 &&
        timeLeft.remainingMinutes === 0 &&
        timeLeft.remainingSeconds === 0 && (
          <span>0s</span> // Display '0s' if all other values are 0
        )}
    </div>
  );
};

function EventCard() {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCountdownComplete = () => {
    setShowConfetti(true);
  };

  return (
    <div className="w-full h-20 p-2 flex items-center justify-between border rounded-lg shadow-sm relative">
      {/* Card Event Color (2px vertical line) */}
      <div className="h-full w-1 bg-orange-400" />

      {/* Event Icon */}
      <div className="flex items-center">
        <Image
          src={PremierLeagueIcon}
          alt="Premier League Icon"
          className="w-16 h-16"
          width={16}
          height={16}
        />
      </div>

      {/* Container with 2 rows for Event Details */}
      <div className="flex flex-col text-xs space-y-1 items-end">
        <span className="font-bold text-right">Premier League</span>
        <span className="text-xs font-normal text-right">
          New season starts
        </span>
        {/* Countdown timer to specific date and time */}
        <CountdownToEventTimer onComplete={handleCountdownComplete} />
      </div>

      {showConfetti && <Confetti recycle={false} numberOfPieces={555} />}
    </div>
  );
}

export default EventCard;
