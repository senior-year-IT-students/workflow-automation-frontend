import { FolderOpen } from "lucide-react";
import { DOCUMENT_TYPES, type DocumentType } from "../types/index";
import { cn } from "@/lib/utils";

interface CategoriesPanelProps {
  selected: DocumentType | "All types";
  onSelect: (cat: DocumentType | "All types") => void;
  counts: Record<string, number>;
  totalArticles: number;
  totalTags: number;
}

export function CategoriesPanel({
  selected,
  onSelect,
  counts,
  totalArticles,
  totalTags,
}: CategoriesPanelProps) {
  const categories: (DocumentType | "All types")[] = [
    "All types",
    ...DOCUMENT_TYPES,
  ];

  return (
    <div className="w-64 shrink-0 space-y-4">
      {/* Categories card */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-card-foreground">
          <FolderOpen className="h-4 w-4" />
          Categories
        </div>
        <div className="space-y-0.5">
          {categories.map((cat) => {
            const count =
              cat === "All types" ? totalArticles : (counts[cat] ?? 0);
            const active = selected === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelect(cat)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-card-foreground hover:bg-accent",
                )}
              >
                <span>{cat}</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium",
                    active
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-primary/10 text-primary",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats card */}
      <div className="rounded-xl border border-border bg-primary/5 p-4 space-y-2">
        <div className="flex items-center justify-between text-sm text-card-foreground">
          <span>Total Articles:</span>
          <span className="font-semibold">{totalArticles}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-card-foreground">
          <span>Total tags:</span>
          <span className="font-semibold">{totalTags}</span>
        </div>
      </div>
    </div>
  );
}
