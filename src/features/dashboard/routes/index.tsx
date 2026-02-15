import ArticleDetailsPage from "@/features/knowledge-base/pages/article-details-page";
import { lazy } from "react";

const DashboardPage = lazy(() => import("../pages/dashboard"));
const TeamPage = lazy(() => import("../pages/team-page"));
const CasesPage = lazy(() => import("../pages/cases-page"));
const AiAgentsPage = lazy(() => import("../pages/ai-agents-page"));
const AnalyticsPage = lazy(() => import("../pages/analytics-page"));
const NotificationsPage = lazy(() => import("../pages/notifications-page"));
const KnowledgeBasePage = lazy(
  () => import("@/features/knowledge-base/pages/knowledge-base-page"),
);
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
      { path: "knowledge-base", element: <KnowledgeBasePage /> },
      { path: "knowledge-base/:articleId", element: <ArticleDetailsPage /> },
      { path: "workflow", element: <WorkflowPage /> },
    ],
  },
];
