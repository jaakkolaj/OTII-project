"use client";

import type { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type FormSubmitButtonProps = {
  text: string;
  loadingText: string;
  size?: ComponentProps<typeof Button>["size"];
  variant?: ComponentProps<typeof Button>["variant"];
  className?: string;
};

export default function FormSubmitButton({
  text,
  loadingText,
  size = "default",
  variant = "default",
  className,
}: FormSubmitButtonProps) {

  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      variant={variant}
      size={size}
      className={className}
    >
      {pending ? (
        <>
          {loadingText}
          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
        </>
      ) : (
        text
      )}
    </Button>
  );
}
