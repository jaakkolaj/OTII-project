"use client";

import { useTransition, useRef } from "react";
import { Trash2, StickyNote } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createNoteAction, deleteNoteAction } from "../actions";

type Note = {
  id: string;
  content: string;
  created_at: string;
};

export function CandidateNotes({
  candidateId,
  initialNotes,
}: {
  candidateId: string;
  initialNotes: Note[];
}) {
  const [isPending, startTransition] = useTransition();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAdd = () => {
    const content = textareaRef.current?.value.trim();
    if (!content) return;

    startTransition(async () => {
      try {
        await createNoteAction(candidateId, content);
        if (textareaRef.current) textareaRef.current.value = "";
      } catch {
        toast.error("Muistiinpanon lisäys epäonnistui");
      }
    });
  };

  const handleDelete = (noteId: string) => {
    startTransition(async () => {
      try {
        await deleteNoteAction(candidateId, noteId);
      } catch {
        toast.error("Muistiinpanon poisto epäonnistui");
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <StickyNote className="h-4 w-4 text-muted-foreground" />
        <h2 className="font-semibold">Muistiinpanot</h2>
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
          {initialNotes.length}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <Textarea
          ref={textareaRef}
          placeholder="Lisää muistiinpano..."
          rows={3}
          className="resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleAdd();
          }}
        />
        <Button
          onClick={handleAdd}
          disabled={isPending}
          size="sm"
          className="self-end"
        >
          {isPending ? "Tallennetaan..." : "Lisää"}
        </Button>
      </div>

      {initialNotes.length === 0 ? (
        <p className="text-sm text-muted-foreground">Ei muistiinpanoja.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {initialNotes.map((note) => (
            <div
              key={note.id}
              className="flex items-start justify-between gap-3 rounded-xl border bg-muted/30 p-4"
            >
              <div className="flex flex-col gap-1">
                <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                <span className="text-xs text-muted-foreground">
                  {new Date(note.created_at).toLocaleString("fi-FI")}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
                onClick={() => handleDelete(note.id)}
                disabled={isPending}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
