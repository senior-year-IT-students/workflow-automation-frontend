"use client";

import React from "react";

import { Sparkles, Puzzle, Play, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingIconProps {
  icon: React.ReactNode;
  className?: string;
  bgColor: string;
  iconColor: string;
  animation: string;
}

function FloatingIcon({
  icon,
  className,
  bgColor,
  iconColor,
  animation,
}: FloatingIconProps) {
  return (
    <div
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-xl shadow-sm",
        bgColor,
        iconColor,
        animation,
        className,
      )}
    >
      {icon}
    </div>
  );
}

function PinkDot({ className }: { className?: string }) {
  return <div className={cn("h-2.5 w-2.5 rounded-full bg-brand", className)} />;
}

export function FloatingIcons() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Purple sparkle icon - top left */}
      <FloatingIcon
        icon={<Sparkles className="h-5 w-5" />}
        className="absolute top-[12%] left-[6%]"
        bgColor="bg-[#8B5CF6]/15 dark:bg-[#8B5CF6]/25"
        iconColor="text-[#8B5CF6]"
        animation="animate-float-y"
      />

      {/* Pink puzzle icon - top right */}
      <FloatingIcon
        icon={<Puzzle className="h-5 w-5" />}
        className="absolute top-[16%] right-[6%]"
        bgColor="bg-brand/15 dark:bg-brand/25"
        iconColor="text-brand"
        animation="animate-float-x"
      />

      {/* Teal play icon - bottom left */}
      <FloatingIcon
        icon={<Play className="h-5 w-5 fill-current" />}
        className="absolute bottom-[14%] left-[22%]"
        bgColor="bg-[#2DD4BF]/15 dark:bg-[#2DD4BF]/25"
        iconColor="text-[#2DD4BF]"
        animation="animate-float-diagonal"
      />

      {/* Gold trending icon - bottom right */}
      <FloatingIcon
        icon={<TrendingUp className="h-5 w-5" />}
        className="absolute bottom-[16%] right-[6%]"
        bgColor="bg-[#F59E0B]/15 dark:bg-[#F59E0B]/25"
        iconColor="text-[#F59E0B]"
        animation="animate-float-reverse"
      />

      {/* Pink dots scattered across the background */}
      <PinkDot className="absolute top-[9%] left-[62%] animate-float-y" />
      <PinkDot className="absolute top-[42%] left-[5%] animate-float-x" />
      <PinkDot className="absolute top-[52%] left-[24%] animate-float-diagonal" />
      <PinkDot className="absolute top-[73%] left-[30%] animate-float-reverse" />
      <PinkDot className="absolute top-[32%] right-[7%] animate-float-y" />
      <PinkDot className="absolute top-[48%] right-[18%] animate-float-x" />
    </div>
  );
}
