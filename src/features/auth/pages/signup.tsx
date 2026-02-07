import { Link } from "react-router-dom";
import { AuthBackground } from "../components/auth-background";
import { AuthCard } from "../components/auth-card";
import { SignupForm } from "../components/signup-form";
import { FeatureBadges } from "../components/feature-badges";

export default function SignupPage() {
  return (
    <AuthBackground>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Welcome to</h1>
        <span className="text-3xl font-bold text-brand"> FlowDesk</span>
        <p className="mt-3 text-muted-foreground">
          Sign up to automate your workflow effortlessly
        </p>
      </div>

      <AuthCard>
        <SignupForm />
      </AuthCard>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-brand hover:underline">
          Sign in
        </Link>
      </p>

      <div className="mt-6">
        <FeatureBadges />
      </div>
    </AuthBackground>
  );
}
