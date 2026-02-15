import { FileText, Tag, Calendar } from "lucide-react";
import type { KBArticle } from "../types/index";

interface ArticleCardProps {
  article: KBArticle;
  onClick: (article: KBArticle) => void;
}

export function ArticleCard({ article, onClick }: ArticleCardProps) {
  const formattedDate = new Date(article.uploadedAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <button
      onClick={() => onClick(article)}
      className="flex w-full gap-4 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-brand hover:shadow-sm"
    >
      {/* PDF Thumbnail */}
      <div className="flex h-20 w-16 shrink-0 items-center justify-center rounded-lg bg-brand/10">
        <FileText className="h-6 w-6 text-primary" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5 min-w-0">
        {/* Document type badge */}
        <span className="inline-flex w-fit rounded-md border border-border bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
          {article.documentType}
        </span>

        <h3 className="text-sm font-semibold text-card-foreground truncate">
          {article.title}
        </h3>

        {/* Tags */}
        <div className="flex items-center gap-1.5">
          <Tag className="h-3 w-3 text-brand" />
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Date */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {formattedDate}
        </div>
      </div>
    </button>
  );
}
