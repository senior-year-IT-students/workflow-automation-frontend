"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  error?: string;
}

export function AuthInput({
  icon,
  error,
  className,
  ...props
}: AuthInputProps) {
  return (
    <div className="space-y-1">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground">
          {icon}
        </div>
        <input
          {...props}
          className={cn(
            "h-12 w-full rounded-lg border bg-transparent pl-11 pr-4 text-sm",
            "text-foreground placeholder:text-muted-foreground",
            "outline-none transition-colors",
            "focus:border-brand focus:ring-1 focus:ring-brand",
            error ? "border-destructive" : "border-border",
            className,
          )}
        />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
