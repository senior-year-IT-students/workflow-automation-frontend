import { lazy } from "react";

const DashboardPage = lazy(() => import("../pages/dashboard"));
const TeamPage = lazy(() => import("../pages/Team-page"));
const CasesPage = lazy(() => import("../pages/cases-page"));
const WorkflowPage = lazy(() => import("../pages/workflow-page"));

export const dashboardRoutes = [
  {
    path: "",
    element: <DashboardPage />, 
    children: [ 
      { path: "team", element: <TeamPage /> },
      { path: "cases", element: <CasesPage /> },
      { path: "workflow", element: <WorkflowPage /> },
    ],
  },
];
