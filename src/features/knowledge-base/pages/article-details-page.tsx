import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Calendar,
  Tag,
  File,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
} from "lucide-react";
import { useKnowledgeBaseStore } from "../hooks/use-knowledge-base-store";
import { EditArticleDialog } from "../components/edit-article-dialog";

export default function ArticleDetailsPage() {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const { articles } = useKnowledgeBaseStore();
  const [editOpen, setEditOpen] = useState(false);

  const article = articles.find((a) => a.id === articleId);

  if (!article) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <p className="text-muted-foreground">Article not found.</p>
      </div>
    );
  }

  const formattedDate = new Date(article.uploadedAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <div className="flex h-full min-h-screen flex-col p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold text-foreground">{article.title}</h1>
        </div>
        <button
          onClick={() => setEditOpen(true)}
          className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-brand/90 transition-colors"
        >
          Edit Metadata and Tags
        </button>
      </div>

      <div className="flex flex-1 gap-6">
        {/* PDF Viewer placeholder */}
        <div className="flex-1 rounded-xl border border-border bg-card overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-end gap-2 border-b border-border px-4 py-2">
            <button className="rounded p-1 text-muted-foreground hover:text-foreground">
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="text-xs text-muted-foreground">100%</span>
            <button className="rounded p-1 text-muted-foreground hover:text-foreground">
              <ZoomIn className="h-4 w-4" />
            </button>
            <div className="mx-2 h-4 w-px bg-border" />
            <button className="rounded p-1 text-muted-foreground hover:text-foreground">
              <RotateCw className="h-4 w-4" />
            </button>
            <button className="rounded p-1 text-muted-foreground hover:text-foreground">
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
          {/* Placeholder content */}
          <div className="flex h-[600px] items-center justify-center bg-secondary/50">
            <div className="text-center text-muted-foreground">
              <FileText className="mx-auto mb-2 h-12 w-12 opacity-40" />
              <p className="text-sm">PDF Preview</p>
              <p className="text-xs">Document viewer placeholder</p>
            </div>
          </div>
        </div>

        {/* Sidebar details */}
        <div className="w-72 shrink-0 space-y-6">
          {/* Document type */}
          <div>
            <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" /> Document type
            </div>
            <p className="text-sm font-semibold text-foreground">
              {article.documentType}
            </p>
          </div>

          {/* Upload date */}
          <div>
            <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" /> Upload Date
            </div>
            <p className="text-sm font-semibold text-foreground">
              {formattedDate}
            </p>
          </div>

          {/* Tags */}
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Tag className="h-4 w-4" /> Tags
            </div>
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* File details */}
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <File className="h-4 w-4" /> File Details
            </div>
            <div className="rounded-xl bg-brand/5 p-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Size</span>
                <span className="font-medium text-foreground">
                  {article.fileSize}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Format</span>
                <span className="font-medium text-foreground">
                  {article.fileFormat}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-card-foreground border-card-foreground hover:bg-accent transition-colors">
            <Download className="h-4 w-4" /> Download File
          </button>
          <button className="flex w-full items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ExternalLink className="h-4 w-4" /> Open In New Tab
          </button>
        </div>
      </div>

      <EditArticleDialog
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        article={article}
      />
    </div>
  );
}
