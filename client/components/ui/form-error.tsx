// src/components/ui/form-error.tsx
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  message?: string | null;
  className?: string;
}

export function FormError({ message, className }: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm text-destructive",
        className
      )}
    >
      <AlertCircle className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
}

interface GeneralErrorProps {
  message?: string | null;
  className?: string;
}

export function GeneralError({ message, className }: GeneralErrorProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        "rounded-lg border border-destructive/50 bg-destructive/10 p-4",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
        <div className="flex-1">
          <h5 className="font-medium text-destructive">Error</h5>
          <p className="text-sm text-destructive/90 mt-1">{message}</p>
        </div>
      </div>
    </div>
  );
}