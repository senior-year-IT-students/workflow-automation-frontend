"use client";

import React from "react";

import { Sparkles, TrendingUp, Workflow } from "lucide-react";

interface FeatureBadgeProps {
  icon: React.ReactNode;
  label: string;
  borderColor: string;
  iconColor: string;
}

function FeatureBadge({
  icon,
  label,
  borderColor,
  iconColor,
}: FeatureBadgeProps) {
  return (
    <div
      className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium text-foreground ${borderColor}`}
    >
      <span className={iconColor}>{icon}</span>
      {label}
    </div>
  );
}

export function FeatureBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <FeatureBadge
        icon={<Sparkles className="h-4 w-4" />}
        label="Ai Power"
        borderColor="border-[#8B5CF6]/40"
        iconColor="text-[#8B5CF6]"
      />
      <FeatureBadge
        icon={<TrendingUp className="h-4 w-4" />}
        label="Lightning Fast"
        borderColor="border-[#F59E0B]/40"
        iconColor="text-[#F59E0B]"
      />
      <FeatureBadge
        icon={<Workflow className="h-4 w-4" />}
        label="No-Code"
        borderColor="border-brand/40"
        iconColor="text-brand"
      />
    </div>
  );
}
