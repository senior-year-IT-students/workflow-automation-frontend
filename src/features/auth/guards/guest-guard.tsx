// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { appRoutes } from "@/routes";
// import type { JSX } from "react";

// export const GuestGuard = ({ children }: { children: JSX.Element }) => {
//   const { isLoggedIn, isLoading } = useAuth();

//   if (isLoading) {
//     return <div>Checking authentication...</div>;
//   }

//   if (isLoggedIn) {
//     return <Navigate to={appRoutes.dashboard.root} replace />;
//   }

//   return children;
// };
