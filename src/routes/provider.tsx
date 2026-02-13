import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { dashboardRoutes } from "@/features/dashboard/routes";
import { authRoutes } from "@/features/auth/routes";
import { LayoutContainer } from "@/shared/layouts/layout-container";
import { AuthGuard } from "@/features/auth/guards/auth-guard";
import { appRoutes } from ".";

const NotFoundPage = lazy(() => import("@/shared/pages/not-found"));

/* ---------------------------------------------
   Global Loading Fallback
--------------------------------------------- */
const LoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center h-screen bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin" />
      <p className="text-muted-foreground text-sm">Loading...</p>
    </div>
  </div>
);

/* ---------------------------------------------
   Router Config
--------------------------------------------- */

const router = createBrowserRouter([
  /* ================= AUTH ROUTES ================= */
  ...authRoutes,

  /* ================= DASHBOARD ================= */
  {
    path: appRoutes.dashboard.root,
    element: (
      // <AuthGuard>
      <LayoutContainer />
      // </AuthGuard>
    ),
    children: dashboardRoutes,
  },

  /* ================= ROOT REDIRECT ================= */
  {
    path: "/",
    element: <Navigate to={appRoutes.auth.login} replace />,
  },

  /* ================= NOT FOUND ================= */
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);

export const AppRouterProvider: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
