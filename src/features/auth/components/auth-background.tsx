"use client";

import React from "react";

import { FloatingIcons } from "./floating-icons";

interface AuthBackgroundProps {
  children: React.ReactNode;
}

export function AuthBackground({ children }: AuthBackgroundProps) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background">
      {/* Top-right purple gradient half-circle */}
      <div
        className="absolute -top-32 -right-32 h-[400px] w-[400px] rounded-full"
        style={{ background: "#8B5CF633" }}
        aria-hidden="true"
      />

      {/* Bottom-left pink gradient half-circle */}
      <div
        className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full"
        style={{ background: "#F0629233" }}
        aria-hidden="true"
      />

      {/* Floating animated icons */}
      <FloatingIcons />

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg px-4 py-12">{children}</div>
    </div>
  );
}
