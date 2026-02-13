import { lazy } from "react";

const DashboardPage = lazy(() => import("../pages/dashboard"));
const TeamPage = lazy(() => import("../pages/team-page"));
const CasesPage = lazy(() => import("../pages/cases-page"));
const AiAgentsPage = lazy(() => import("../pages/ai-agents-page"));
const AnalyticsPage = lazy(() => import("../pages/analytics-page"));
const NotificationsPage = lazy(() => import("../pages/notifications-page"));
const KBPage = lazy(() => import("../pages/KB-page"));
const WorkflowPage = lazy(() => import("../pages/workflow-page"));

export const dashboardRoutes = [
  {
    path: "",
    element: <DashboardPage />,
    children: [
      { path: "team", element: <TeamPage /> },
      { path: "cases", element: <CasesPage /> },
      { path: "ai-agents", element: <AiAgentsPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "notifications", element: <NotificationsPage /> },
      { path: "knowledge-base", element: <KBPage /> },
      { path: "workflow", element: <WorkflowPage /> },
    ],
  },
];
