import { Link } from "react-router-dom";
import { AuthBackground } from "../components/auth-background";
import { LoginForm } from "../components/login-form";
import { FeatureBadges } from "../components/feature-badges";

export default function LoginPage() {
  return (
    <AuthBackground>
      {/* Heading */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Welcome Back to
        </h1>
        <span className="text-3xl font-bold tracking-tight text-brand sm:text-4xl">
          FlowDesk
        </span>
        <p className="mt-3 text-base text-muted-foreground">
          Sign in to continue building amazing workflows
        </p>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-border bg-card p-8 shadow-lg dark:shadow-none">
        <LoginForm />
      </div>

      {/* Bottom link */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        {"Don't have an account ? "}
        <Link to="/signup" className="font-semibold text-brand hover:underline">
          Sign up
        </Link>
      </p>

      {/* Feature badges */}
      <div className="mt-6">
        <FeatureBadges />
      </div>
    </AuthBackground>
  );
}
