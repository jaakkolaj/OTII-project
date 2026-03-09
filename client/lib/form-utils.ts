// Utility types for form handling in the client application.
export type FormErrors<T> = {
  [K in keyof T]?: string[];
};

export type FormState<T> = {
  errors?: FormErrors<T>;
  success?: boolean;
  fields?: Partial<T>;
  message?: string | null;
} | null;
