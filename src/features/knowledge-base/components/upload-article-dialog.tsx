import { useState, useRef, useCallback } from "react";
import { Upload, X, FileText, ChevronDown, Hash, Type } from "lucide-react";
import { DOCUMENT_TYPES, type DocumentType } from "../types/index";
import { useKnowledgeBaseStore } from "../hooks/use-knowledge-base-store";

interface UploadArticleDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function UploadArticleDialog({
  isOpen,
  onClose,
}: UploadArticleDialogProps) {
  const { addArticle, tenantTags, addTag } = useKnowledgeBaseStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [docType, setDocType] = useState<DocumentType | "">("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragActive, setDragActive] = useState(false);

  const resetForm = () => {
    setFile(null);
    setTitle("");
    setDocType("");
    setSelectedTags([]);
    setTagInput("");
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files[0];
    validateAndSetFile(f);
  }, []);

  const validateAndSetFile = (f: File | undefined) => {
    if (!f) return;
    if (f.type !== "application/pdf") {
      setErrors((e) => ({ ...e, file: "Only PDF files are accepted" }));
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      setErrors((e) => ({ ...e, file: "File must be under 10MB" }));
      return;
    }
    setErrors((e) => {
      const { file: _, ...rest } = e;
      return rest;
    });
    setFile(f);
  };

  const handleSubmit = () => {
    const errs: Record<string, string> = {};
    if (!file) errs.file = "Please upload a PDF file";
    if (!title.trim()) errs.title = "Title is required";
    if (!docType) errs.docType = "Document type is required";
    if (selectedTags.length === 0) errs.tags = "At least one tag is required";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    addArticle({
      title: title.trim(),
      documentType: docType as DocumentType,
      tags: selectedTags,
      fileSize: `${(file!.size / (1024 * 1024)).toFixed(1)} MB`,
      fileFormat: "PDF",
    });
    handleClose();
  };

  const handleAddTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed) return;
    if (selectedTags.some((t) => t.toLowerCase() === trimmed.toLowerCase()))
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[480px] rounded-2xl border border-border bg-card p-6 shadow-xl"
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="mb-5 flex items-center gap-2">
          <Upload className="h-5 w-5 text-foreground" />
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">
              Upload New Article
            </h2>
            <p className="text-sm text-muted-foreground">
              Add a PDF to your tenant's knowledge base.
            </p>
          </div>
        </div>

        {/* File drop zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`mb-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-colors ${
            dragActive
              ? "border-primary bg-primary/10"
              : "border-primary/30 bg-primary/5"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => validateAndSetFile(e.target.files?.[0])}
          />
          {file ? (
            <div className="flex items-center gap-2 text-sm text-card-foreground">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-medium">{file.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <>
              <FileText className="mb-2 h-8 w-8 text-primary/60" />
              <p className="text-sm text-muted-foreground">
                Drag & drop your PDF here
              </p>
              <p className="text-xs text-muted-foreground">
                or click to browse
              </p>
            </>
          )}
        </div>
        {errors.file && (
          <p className="mb-3 -mt-2 text-xs text-destructive">{errors.file}</p>
        )}

        {/* Title */}
        <label className="mb-1 block text-sm font-medium text-card-foreground">
          Title
        </label>
        <div className="mb-3 flex items-center gap-2 rounded-lg border border-input bg-card px-3 py-2">
          <Type className="h-4 w-4 text-primary" />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter article title"
            className="flex-1 bg-transparent text-sm text-card-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
        {errors.title && (
          <p className="mb-3 -mt-2 text-xs text-destructive">{errors.title}</p>
        )}

        {/* Document Type */}
        <label className="mb-1 block text-sm font-medium text-card-foreground">
          Document Type
        </label>
        <div className="relative mb-3">
          <button
            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            className="flex w-full items-center justify-between rounded-lg border border-input bg-card px-3 py-2 text-sm"
          >
            <span
              className={
                docType ? "text-card-foreground" : "text-muted-foreground"
              }
            >
              {docType || "choose your document type"}
            </span>
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
        {errors.docType && (
          <p className="mb-3 -mt-2 text-xs text-destructive">
            {errors.docType}
          </p>
        )}

        {/* Tags */}
        <label className="mb-1 block text-sm font-medium text-card-foreground">
          Tags{" "}
          <span className="font-normal text-muted-foreground">
            (at least one)
          </span>
        </label>
        <div className="relative mb-3">
          <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-input bg-card px-3 py-2">
            <Hash className="h-4 w-4 text-primary" />
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
              placeholder={
                selectedTags.length === 0 ? "search or create tags" : ""
              }
              className="flex-1 min-w-[80px] bg-transparent text-sm text-card-foreground placeholder:text-muted-foreground outline-none"
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
        {errors.tags && (
          <p className="mb-3 -mt-2 text-xs text-destructive">{errors.tags}</p>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={handleClose}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-card-foreground hover:bg-accent transition-colors"
          >
            cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            upload article
          </button>
        </div>
      </div>
    </div>
  );
}
