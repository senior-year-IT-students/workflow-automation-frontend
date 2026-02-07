"use client";

import React from "react";

interface AuthCardProps {
  children: React.ReactNode;
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-lg dark:shadow-none">
      {children}
    </div>
  );
}
