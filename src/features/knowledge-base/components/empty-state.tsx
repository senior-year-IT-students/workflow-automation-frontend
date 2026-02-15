import { BookOpen, Plus, Sparkles } from "lucide-react";

interface EmptyStateProps {
  onUpload: () => void;
}

export function KBEmptyState({ onUpload }: EmptyStateProps) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center text-center">
        {/* Illustration */}
        <div className="relative mb-6">
          {/* Outer dashed circle */}
          <div className="h-40 w-40 rounded-full border-2 border-dashed border-primary/30 bg-primary/10 flex items-center justify-center">
            {/* Inner solid circle */}
            <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
              <Plus className="h-6 w-6 text-foreground" />
            </div>
          </div>
          {/* Floating icons */}
          <div className="absolute -top-2 left-0 animate-float-y">
            <div className="rounded-lg bg-primary/80 p-2">
              <BookOpen className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>
          <div className="absolute -bottom-1 right-0 animate-float-diagonal">
            <div className="rounded-lg bg-primary/80 p-2">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>
        </div>

        <h2 className="mb-2 text-xl font-semibold text-foreground">
          Your Knowledge Base is Empty
        </h2>
        <p className="mb-6 max-w-sm text-sm text-muted-foreground">
          upload your first document to build a powerful knowledge base for your
          AI agent and team.
        </p>
        <button
          onClick={onUpload}
          className="inline-flex items-center gap-2 rounded-lg bg-primary/15 px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/25 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Upload Your Article
        </button>
      </div>
    </div>
  );
}
