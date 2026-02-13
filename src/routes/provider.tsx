// import React, { lazy, Suspense } from "react";
// import {
//   createBrowserRouter,
//   RouterProvider,
 
// } from "react-router-dom";

// import { authRoutes } from "../features/auth/routes";
// import { dashboardRoutes } from "../features/dashboard/routes";
// import { AuthGuard } from "../features/auth/guards/auth-guard";
// import { LayoutContainer } from "../shared/layouts/layout-container";
// import { AuthRedirect } from "../features/auth/hooks/AuthRedirect";
// import { AuthProvider } from "../features/auth/context/AuthContext";


// const NotFoundPage = lazy(() => import("../shared/pages/not-found"));

// const protectedDashboardRoutes = dashboardRoutes.map((route) => ({
//   ...route,
//   element: <AuthGuard>{route.element}</AuthGuard>,
//   // children: route.children?.map((child) => ({
//   //   ...child,
//   //   element: <AuthGuard>{child.element}</AuthGuard>,
//   // })),
// }));


// const LoadingFallback: React.FC = () => (
//   <div className="flex items-center justify-center h-screen bg-gray-100">
//     <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center gap-4">
//       <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//       <p className="text-gray-700 text-lg">Loading, please wait...</p>
//     </div>
//   </div>
// );
// const routes = [
//   {
//     path: "/",
//     element: <LayoutContainer />,
//     children: [
//       { index: true, element: <AuthRedirect /> },
//       ...authRoutes,
//       ...protectedDashboardRoutes,
//       {
//         path: "*",
//         element: (
//           <Suspense fallback={<LoadingFallback />}>
//             <NotFoundPage />
//           </Suspense>
//         ),
//       },
//     ],
//   },
// ];

// const router = createBrowserRouter(routes);

// export const AppRouterProvider: React.FC = () => {
//   return (
//     <AuthProvider>
//       <RouterProvider router={router} />
//     </AuthProvider>
//   );
// };
import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { dashboardRoutes } from "../features/dashboard/routes";
import { LayoutContainer } from "../shared/layouts/layout-container";

const NotFoundPage = lazy(() => import("../shared/pages/not-found"));

// Suspense fallback loader
const LoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-700 text-lg">Loading, please wait...</p>
    </div>
  </div>
);

// Routes array (dashboard + nested children only)
const routes = [
  {
    path: "/dashboard",
    element: <LayoutContainer />, // Layout must have <Outlet /> for children
    children: [
      ...dashboardRoutes, // your dashboard + children
      {
        path: "*",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
  // Redirect root "/" to dashboard
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  // Redirect any unknown paths to dashboard
  { path: "*", element: <Navigate to="/dashboard" replace /> },
];

const router = createBrowserRouter(routes);

export const AppRouterProvider: React.FC = () => {
  return <RouterProvider router={router} />;
};
