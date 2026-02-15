import { useState } from "react";
import { X, ChevronDown, Hash, Type, Pencil } from "lucide-react";
import {
  DOCUMENT_TYPES,
  type DocumentType,
  type KBArticle,
} from "../types/index";
import { useKnowledgeBaseStore } from "../hooks/use-knowledge-base-store";

interface EditArticleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  article: KBArticle;
}

export function EditArticleDialog({
  isOpen,
  onClose,
  article,
}: EditArticleDialogProps) {
  const { updateArticle, tenantTags, addTag } = useKnowledgeBaseStore();

  const [title, setTitle] = useState(article.title);
  const [docType, setDocType] = useState<DocumentType>(article.documentType);
  const [selectedTags, setSelectedTags] = useState<string[]>([...article.tags]);
  const [tagInput, setTagInput] = useState("");
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const handleSave = () => {
    if (!title.trim() || selectedTags.length === 0) return;
    updateArticle(article.id, {
      title: title.trim(),
      documentType: docType,
      tags: selectedTags,
    });
    onClose();
  };

  const handleAddTag = (tag: string) => {
    const trimmed = tag.trim();
    if (
      !trimmed ||
      selectedTags.some((t) => t.toLowerCase() === trimmed.toLowerCase())
    )
      return;
    setSelectedTags([...selectedTags, trimmed]);
    addTag(trimmed);
    setTagInput("");
    setShowTagDropdown(false);
  };

  const filteredTags = tenantTags.filter(
    (t) =>
      t.toLowerCase().includes(tagInput.toLowerCase()) &&
      !selectedTags.some((s) => s.toLowerCase() === t.toLowerCase()),
  );

  const formattedDate = new Date(article.uploadedAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    },
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[480px] rounded-2xl border border-border bg-card p-6 shadow-xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-5 flex items-center gap-2">
          <Pencil className="h-5 w-5 text-foreground" />
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">
              Edit Article
            </h2>
            <p className="text-sm text-muted-foreground">
              Update the metadata and tags for this article
            </p>
          </div>
        </div>

        {/* Title */}
        <label className="mb-1 block text-sm font-medium text-card-foreground">
          Title
        </label>
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-input bg-card px-3 py-2">
          <Type className="h-4 w-4 text-brand" />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 bg-transparent text-sm text-card-foreground outline-none"
          />
        </div>

        {/* Document Type */}
        <label className="mb-1 block text-sm font-medium text-card-foreground">
          Document Type
        </label>
        <div className="relative mb-4">
          <button
            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            className="flex w-full items-center justify-between rounded-lg border border-input bg-card px-3 py-2 text-sm text-card-foreground"
          >
            <span>{docType}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
          {showTypeDropdown && (
            <div className="absolute z-10 mt-1 w-full rounded-lg border border-border bg-popover p-1 shadow-md">
              {DOCUMENT_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setDocType(t);
                    setShowTypeDropdown(false);
                  }}
                  className="w-full rounded-md px-3 py-1.5 text-left text-sm text-popover-foreground hover:bg-accent"
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tags */}
        <label className="mb-1 block text-sm font-medium text-card-foreground">
          Tags{" "}
          <span className="font-normal text-muted-foreground">
            (at least one)
          </span>
        </label>
        <div className="relative mb-4">
          <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-input bg-card px-3 py-2">
            <Hash className="h-4 w-4 text-brand" />
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
              >
                {tag}
                <button
                  onClick={() =>
                    setSelectedTags(selectedTags.filter((t) => t !== tag))
                  }
                  className="hover:text-destructive"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              value={tagInput}
              onChange={(e) => {
                setTagInput(e.target.value);
                setShowTagDropdown(true);
              }}
              onFocus={() => setShowTagDropdown(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && tagInput.trim()) {
                  e.preventDefault();
                  handleAddTag(tagInput);
                }
              }}
              className="flex-1 min-w-[80px] bg-transparent text-sm text-card-foreground outline-none"
            />
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
          {showTagDropdown && (tagInput || filteredTags.length > 0) && (
            <div className="absolute z-10 mt-1 w-full rounded-lg border border-border bg-popover p-1 shadow-md max-h-32 overflow-auto">
              {filteredTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleAddTag(tag)}
                  className="w-full rounded-md px-3 py-1.5 text-left text-sm text-popover-foreground hover:bg-accent"
                >
                  {tag}
                </button>
              ))}
              {tagInput.trim() &&
                !tenantTags.some(
                  (t) => t.toLowerCase() === tagInput.trim().toLowerCase(),
                ) && (
                  <button
                    onClick={() => handleAddTag(tagInput)}
                    className="w-full rounded-md px-3 py-1.5 text-left text-sm text-primary hover:bg-accent"
                  >
                    + Create "{tagInput.trim()}"
                  </button>
                )}
            </div>
          )}
        </div>

        {/* Upload date (read-only) */}
        <label className="mb-1 block text-sm font-medium text-card-foreground">
          Document Uploaded Date
        </label>
        <div className="mb-4 rounded-lg border border-input bg-secondary px-3 py-2 text-sm text-muted-foreground">
          {formattedDate}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-card-foreground hover:bg-accent transition-colors"
          >
            cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-brand/90 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
