"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { signupSchema, type SignupFormValues } from "../signup-config";
import { cn } from "@/lib/utils";

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: yupResolver(signupSchema),
  });

  async function onSubmit(data: SignupFormValues) {
    console.log("Signup submitted:", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="First Name"
          icon={<User className="h-4 w-4" />}
          placeholder="Your first name"
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <Input
          label="Last Name"
          icon={<User className="h-4 w-4" />}
          placeholder="Your last name"
          {...register("lastName")}
          error={errors.lastName?.message}
        />
      </div>

      {/* Business Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Business Type</label>
        <div className="relative">
          <Briefcase className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <select
            {...register("businessType")}
            className={cn(
              "h-12 w-full rounded-lg border bg-transparent pl-11 pr-4 text-sm",
              "focus:border-brand focus:ring-1 focus:ring-brand",
              errors.businessType ? "border-destructive" : "border-border",
            )}
          >
            <option value="">Choose your business type</option>
            <option value="startup">Startup</option>
            <option value="agency">Agency</option>
            <option value="enterprise">Enterprise</option>
            <option value="freelancer">Freelancer</option>
          </select>
        </div>
        {errors.businessType && (
          <p className="text-xs text-destructive">
            {errors.businessType.message}
          </p>
        )}
      </div>

      {/* Email */}
      <Input
        label="Email Address"
        icon={<Mail className="h-4 w-4" />}
        placeholder="Enter your email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />

      {/* Password */}
      <PasswordInput
        label="Password"
        show={showPassword}
        toggle={() => setShowPassword(!showPassword)}
        {...register("password")}
        error={errors.password?.message}
      />

      {/* Confirm Password */}
      <PasswordInput
        label="Confirm Password"
        show={showPassword}
        toggle={() => setShowPassword(!showPassword)}
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand text-brand-foreground font-medium hover:opacity-90 disabled:opacity-60"
      >
        <span>{isSubmitting ? "Creating account..." : "Sign up"}</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}

/* --- Small helpers --- */

function Input({ label, icon, error, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground">
          {icon}
        </div>
        <input
          {...props}
          className="h-12 w-full rounded-lg border bg-transparent pl-11 pr-4 text-sm focus:border-brand focus:ring-1 focus:ring-brand"
        />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function PasswordInput({ label, show, toggle, error, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="relative">
        <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type={show ? "text" : "password"}
          {...props}
          className="h-12 w-full rounded-lg border bg-transparent pl-11 pr-12 text-sm focus:border-brand focus:ring-1 focus:ring-brand"
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
