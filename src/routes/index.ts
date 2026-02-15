// routes/index.ts

export const appRoutes = {
  auth: {
    login: "/login",
    signUp: "/sign-up",
  },

  dashboard: {
    root: "/dashboard",
    team: "/dashboard/team",
    cases: "/dashboard/cases",
    aiAgents: "/dashboard/ai-agents",
    analytics: "/dashboard/analytics",
    notifications: "/dashboard/notifications",
    knowledgeBase: "/dashboard/knowledge-base",
    knowledgeBaseDetails: "/dashboard/knowledge-base/:articleId",
    workflow: "/dashboard/workflow",
  },

  home: "/",
};
