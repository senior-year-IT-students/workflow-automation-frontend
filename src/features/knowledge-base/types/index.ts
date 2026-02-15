export interface KBArticle {
  id: string;
  title: string;
  documentType: DocumentType;
  tags: string[];
  uploadedAt: string;
  fileSize: string;
  fileFormat: string;
  tenantId: string;
  fileUrl?: string;
}

export type DocumentType =
  | "Policy"
  | "Procedure"
  | "Guide"
  | "Template"
  | "Report"
  | "Training"
  | "others";

export const DOCUMENT_TYPES: DocumentType[] = [
  "Policy",
  "Procedure",
  "Guide",
  "Template",
  "Report",
  "Training",
  "others",
];

export type SortOrder = "newest" | "oldest" | "a-z" | "z-a";

export interface KBFilters {
  search: string;
  category: DocumentType | "All types";
  sort: SortOrder;
  page: number;
  pageSize: number;
}
