import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, ChevronDown } from "lucide-react";
import { useKnowledgeBaseStore } from "../hooks/use-knowledge-base-store";
import { KBEmptyState } from "../components/empty-state";
import { ArticleCard } from "../components/article-card";
import { CategoriesPanel } from "../components/categories-panel";
import { UploadArticleDialog } from "../components/upload-article-dialog";
import { Pagination } from "../components/pagination";
import type { SortOrder } from "../types";

const SORT_OPTIONS: { label: string; value: SortOrder }[] = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "A → Z", value: "a-z" },
  { label: "Z → A", value: "z-a" },
];

export default function KnowledgeBasePage() {
  const navigate = useNavigate();
  const { articles, filters, setFilters, getFilteredArticles, tenantTags } =
    useKnowledgeBaseStore();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const filtered = getFilteredArticles();
  const totalPages = Math.ceil(filtered.length / filters.pageSize);
  const paginated = filtered.slice(
    (filters.page - 1) * filters.pageSize,
    filters.page * filters.pageSize,
  );

  // Count per category
  const counts: Record<string, number> = {};
  articles.forEach((a) => {
    counts[a.documentType] = (counts[a.documentType] || 0) + 1;
  });

  const isEmpty = articles.length === 0;

  return (
    <div className="flex h-full min-h-screen flex-col p-6">
      {isEmpty ? (
        <KBEmptyState onUpload={() => setUploadOpen(true)} />
      ) : (
        <>
          {/* Header */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Knowledge Base
              </h1>
              <p className="text-sm text-muted-foreground">
                Centralized documentation and business rules
              </p>
            </div>
            <button
              onClick={() => setUploadOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Upload Article
            </button>
          </div>

          {/* Search + Sort */}
          <div className="mb-6 flex gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-input bg-card px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
                placeholder="Search for the article's name or tags"
                className="flex-1 bg-transparent text-sm text-card-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-2 rounded-lg border border-input bg-card px-4 py-2 text-sm text-card-foreground"
              >
                {SORT_OPTIONS.find((s) => s.value === filters.sort)?.label}
                <ChevronDown className="h-4 w-4" />
              </button>
              {showSort && (
                <div className="absolute right-0 z-10 mt-1 w-40 rounded-lg border border-border bg-popover p-1 shadow-md">
                  {SORT_OPTIONS.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => {
                        setFilters({ sort: s.value });
                        setShowSort(false);
                      }}
                      className="w-full rounded-md px-3 py-1.5 text-left text-sm text-popover-foreground hover:bg-accent"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="flex gap-6">
            <CategoriesPanel
              selected={filters.category}
              onSelect={(cat) => setFilters({ category: cat })}
              counts={counts}
              totalArticles={articles.length}
              totalTags={tenantTags.length}
            />

            {/* Articles list */}
            <div className="flex-1 space-y-3">
              {paginated.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onClick={(a) => navigate(`/dashboard/knowledge-base/${a.id}`)}
                />
              ))}
              <Pagination
                currentPage={filters.page}
                totalPages={totalPages}
                onPageChange={(p) => setFilters({ page: p })}
              />
            </div>
          </div>
        </>
      )}

      <UploadArticleDialog
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
      />
    </div>
  );
}
