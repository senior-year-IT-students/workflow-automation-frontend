"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { loginSchema, type LoginFormValues } from "./config";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    // This will be replaced with actual API call via axios + react-query
    console.log("Login submitted:", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email Field */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-foreground"
        >
          Email Address
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Mail className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className={cn(
              "h-12 w-full rounded-lg border bg-transparent pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors",
              "focus:border-brand focus:ring-1 focus:ring-brand",
              errors.email ? "border-destructive" : "border-border",
            )}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-foreground"
        >
          Password
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Lock className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password")}
            className={cn(
              "h-12 w-full rounded-lg border bg-transparent pl-11 pr-12 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors",
              "focus:border-brand focus:ring-1 focus:ring-brand",
              errors.password ? "border-destructive" : "border-border",
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand text-brand-foreground font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        <span>{isSubmitting ? "Signing in..." : "Sign in"}</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
