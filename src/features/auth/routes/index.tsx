import { lazy } from "react";

const LoginPage = lazy(() => import("../pages/login"));
const SignupPage = lazy(() => import("../pages/signup"));

export const authRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <SignupPage />,
  },
];
