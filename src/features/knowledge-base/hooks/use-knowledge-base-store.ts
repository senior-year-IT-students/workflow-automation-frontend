import { create } from "zustand";
import type { KBArticle, KBFilters, DocumentType } from "../types/index";

const MOCK_TAGS = [
  "compliance",
  "privacy",
  "gdpr",
  "security",
  "onboarding",
  "sla",
];

const generateMockArticles = (): KBArticle[] => {
  const titles = [
    "Data Privacy Guidelines",
    "Employee Onboarding Procedure",
    "SLA Response Templates",
    "Security Best Practices",
    "Customer Escalation Guide",
    "GDPR Compliance Report",
    "Refund Policy Document",
    "Training Materials Overview",
    "Incident Response Procedure",
    "Knowledge Sharing Template",
    "Annual Security Report",
    "Privacy Training Guide",
  ];
  const types: DocumentType[] = [
    "Policy",
    "Policy",
    "Template",
    "Guide",
    "Guide",
    "Report",
    "Policy",
    "Training",
    "Procedure",
    "Template",
    "Report",
    "Training",
  ];

  return titles.map((title, i) => ({
    id: `article-${i + 1}`,
    title,
    documentType: types[i],
    tags: MOCK_TAGS.slice(i % 3, (i % 3) + 3),
    uploadedAt: "2026-02-08",
    fileSize: "1.2 MB",
    fileFormat: "PDF",
    tenantId: "tenant-1",
  }));
};

interface KBState {
  articles: KBArticle[];
  tenantTags: string[];
  filters: KBFilters;
  setFilters: (f: Partial<KBFilters>) => void;
  addArticle: (
    article: Omit<KBArticle, "id" | "tenantId" | "uploadedAt">,
  ) => void;
  updateArticle: (id: string, data: Partial<KBArticle>) => void;
  getFilteredArticles: () => KBArticle[];
  addTag: (tag: string) => void;
}

export const useKnowledgeBaseStore = create<KBState>((set, get) => ({
  articles: generateMockArticles(),
  tenantTags: [...MOCK_TAGS],
  filters: {
    search: "",
    category: "All types",
    sort: "newest",
    page: 1,
    pageSize: 5,
  },
  setFilters: (f) =>
    set((s) => ({ filters: { ...s.filters, ...f, page: f.page ?? 1 } })),
  addArticle: (data) =>
    set((s) => ({
      articles: [
        {
          ...data,
          id: `article-${Date.now()}`,
          tenantId: "tenant-1",
          uploadedAt: new Date().toISOString().split("T")[0],
        },
        ...s.articles,
      ],
    })),
  updateArticle: (id, data) =>
    set((s) => ({
      articles: s.articles.map((a) => (a.id === id ? { ...a, ...data } : a)),
    })),
  addTag: (tag) =>
    set((s) => {
      const lower = tag.toLowerCase();
      if (s.tenantTags.some((t) => t.toLowerCase() === lower)) return s;
      return { tenantTags: [...s.tenantTags, tag] };
    }),
  getFilteredArticles: () => {
    const { articles, filters } = get();
    let filtered = [...articles];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (filters.category !== "All types") {
      filtered = filtered.filter((a) => a.documentType === filters.category);
    }

    switch (filters.sort) {
      case "oldest":
        filtered.reverse();
        break;
      case "a-z":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "z-a":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return filtered;
  },
}));
