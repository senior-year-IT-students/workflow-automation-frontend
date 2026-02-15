import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const KnowledgeBasePage = lazy(() => import("../pages/knowledge-base-page"));
const ArticleDetailsPage = lazy(() => import("../pages/article-details-page"));

export const knowledgeBaseRoutes: RouteObject[] = [
  { index: true, element: <KnowledgeBasePage /> },
  { path: ":articleId", element: <ArticleDetailsPage /> },
];
