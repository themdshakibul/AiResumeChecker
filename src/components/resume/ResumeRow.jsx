import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  FileText,
  ChevronRight,
  Trash2,
  Layers,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { relativeTime } from "@/lib/utils";
import { useDeleteResume } from "@/hooks/useResumes";

export function ResumeRow({ resume }) {
  const nav = useNavigate();
  const del = useDeleteResume();
  const [confirmOpen, setConfirmOpen] = useState(false);

  function openConfirm(e) {
    e.stopPropagation();
    setConfirmOpen(true);
  }

  async function remove() {
    try {
      await del.mutateAsync(resume._id);
      setConfirmOpen(false);
    } catch {
      // The mutation hook surfaces the error toast.
    }
  }

  useEffect(() => {
    if (!confirmOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape" && !del.isPending) setConfirmOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [confirmOpen, del.isPending]);

  return (
    <Card
      onClick={() => nav(`/resumes/${resume._id}`)}
      className="cursor-pointer flex items-center gap-4"
    >
      <div className="h-12 w-12 rounded-2xl bg-[var(--accent-soft)] text-[var(--accent-strong)] flex items-center justify-center shrink-0">
        <FileText size={18} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-display text-base font-semibold truncate">
          {resume.title}
        </div>
        <div className="text-xs text-[var(--ink-muted)] mt-0.5">
          Updated {relativeTime(resume.updatedAt)}
        </div>
      </div>

      <Badge tone="neutral" className="gap-1">
        <Layers size={11} />
        {resume.latestVersionNumber || 1} version{(resume.latestVersionNumber || 1) > 1 ? "s" : ""}
      </Badge>

      <button
        onClick={openConfirm}
        disabled={del.isPending}
        className="h-9 w-9 rounded-full hover:bg-[var(--surface-2)] flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--danger)] transition-colors"
        title="Delete"
        aria-label={`Delete ${resume.title}`}
      >
        <Trash2 size={15} />
      </button>

      <ChevronRight size={16} className="text-[var(--ink-muted)]" />

      <AnimatePresence>
        {confirmOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget && !del.isPending) {
                setConfirmOpen(false);
              }
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-0 bg-[var(--ink)]/35 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-hover"
              role="dialog"
              aria-modal="true"
              aria-labelledby={`delete-title-${resume._id}`}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between px-6 pt-6">
                <div className="h-12 w-12 rounded-2xl bg-[#F8E3E0] text-[var(--danger)] flex items-center justify-center">
                  <AlertTriangle size={21} />
                </div>
                <button
                  type="button"
                  onClick={() => setConfirmOpen(false)}
                  disabled={del.isPending}
                  className="h-9 w-9 rounded-full flex items-center justify-center text-[var(--ink-muted)] hover:bg-[var(--surface-2)] transition-colors"
                  aria-label="Close delete confirmation"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="px-6 pt-5 pb-6">
                <h2
                  id={`delete-title-${resume._id}`}
                  className="font-display text-xl font-semibold tracking-tight text-[var(--ink)]"
                >
                  Delete this resume?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">
                  <span className="font-medium text-[var(--ink)]">
                    {resume.title}
                  </span>{" "}
                  and all of its versions, analyses, and rewrite suggestions
                  will be permanently removed.
                </p>

                <div className="mt-5 flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setConfirmOpen(false)}
                    disabled={del.isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={remove}
                    disabled={del.isPending}
                    className="bg-[var(--danger)] text-white hover:bg-[#A94E46]"
                  >
                    <Trash2 size={14} />
                    {del.isPending ? "Deleting..." : "Delete resume"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
